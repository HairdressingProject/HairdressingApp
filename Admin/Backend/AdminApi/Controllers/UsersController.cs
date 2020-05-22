using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminApi.Models_v2;
using AdminApi.Validation;
using Microsoft.AspNetCore.Cors;
using AdminApi.Services;
using AdminApi.Helpers;
using Microsoft.AspNetCore.Http;
using System;
using AdminApi.Models_v2.Validation;
using Microsoft.Data.SqlClient;

namespace AdminApi.Controllers
{
    /**
     * UsersController
     * This controller handles all routes in the format: "/api/users/"
     * To disable authentication, simply comment out the [Authorize] annotation
     * 
    **/
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly hair_project_dbContext _context;
        private readonly IAuthorizationService _authorizationService;
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;

        public UsersController(hair_project_dbContext context,
            IUserService userService,
            IAuthorizationService authorizationService,
            IEmailService emailService)
        {
            _context = context;
            _userService = userService;
            _authorizationService = authorizationService;
            _emailService = emailService;
        }

        // GET: api/users
        [EnableCors("Policy1")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            var mappedUsers = await MapFeaturesToUsers();
            var mappedUsersWithoutPasswords = mappedUsers.WithoutPasswords();

            var usersResponse = new
            {
                users = mappedUsersWithoutPasswords
            };

            return Ok(usersResponse);
        }

        // GET: api/users/5
        [HttpGet("{id:long}")]
        public async Task<ActionResult<Users>> GetUser(ulong id)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            else
            {
                var mappedUser = await MapFeaturesToUsers(user);
                var userWithoutPassword = mappedUser.WithoutPassword();
                var userResponse = new
                {
                    user = userWithoutPassword
                };

                return Ok(userResponse);
            }

            // return users;
        }

        // GET: api/users/{guid} - Can be used to get user details based on their recover password token (if valid)
        [HttpGet("{token:guid}")]
        public async Task<ActionResult<Users>> GetUser(Guid token)
        {
            if (token == null || token == Guid.Empty)
            {
                return BadRequest(new { errors = new { Token = new string[] { "Invalid token" } }, status = 400 });
            }

            var associatedAccount = await _context.Accounts.FromSqlInterpolated($"SELECT * FROM accounts WHERE recover_password_token = UNHEX(REPLACE({token}, {"-"}, {""}))").ToListAsync();

            if (associatedAccount.Count > 0)
            {
                var userId = associatedAccount[0].UserId;
                var associatedUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

                if (associatedUser != null)
                {
                    return Ok(new {
                        associatedUser.UserEmail
                    });
                }

                return NotFound(new { errors = new { Account = new string[] { "No user associated with the token provided was found" } }, status = 404 });
            }

            return NotFound(new { errors = new { Account = new string[] { "No account associated with the token provided was found" } }, status = 404 });
        }


        // GET: /api/users/logout
        [HttpGet("logout")]
        public IActionResult LogoutUser()
        {
            // Invalidate token/cookie
            Response.Cookies.Delete("auth");
            return Ok(new { message = "Logout successful" });
        }

        // ********************************************************************************************************************************************        
        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(ulong id, [FromBody] Users users)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            if (id != users.Id)
            {
                return BadRequest(new { errors = new { Id = new string[] { "ID sent does not match the one in the endpoint" } }, status = 400 });
            }

            var existingUserName = await _context.Users.AnyAsync(u => u.Id != users.Id && u.UserName == users.UserName);

            if (existingUserName)
            {
                return Conflict(new { errors = new { UserName = new string[] { "Username is already taken" } }, status = 409 });
            }

            var existingEmail = await _context.Users.AnyAsync(u => u.Id != users.Id && u.UserEmail == users.UserEmail);

            if (existingEmail)
            {
                return Conflict(new { errors = new { UserEmail = new string[] { "Email is already registered" } }, status = 409 });
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // ********************************************************************************************************************************************

        // PUT: api/users/{guid}/change_password : Method to change user password (based on user's recover password token).
        [HttpPut("{token:guid}/change_password")]
        public async Task<IActionResult> SetNewPassword(Guid token, [FromBody] AuthenticatedUserModel user)
        {
            var existingToken = await _context.Accounts.FromSqlInterpolated($"SELECT * FROM accounts WHERE recover_password_token = UNHEX(REPLACE({token}, {"-"}, {""}))").ToListAsync();

            if (existingToken.Count > 0)
            {
                // token was found, get user id and change their password
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == existingToken[0].UserId);

                if (existingUser != null)
                {
                    existingUser.UserPassword = user.UserPassword;
                    _context.Entry(existingUser).State = EntityState.Modified;

                    // invalidate token, now that the password has changed
                    var accountEntry = await _context.Accounts.FirstOrDefaultAsync(a => a.UserId == existingUser.Id);
                    if (accountEntry != null)
                    {
                        accountEntry.RecoverPasswordToken = null;
                        _context.Entry(accountEntry).State = EntityState.Modified;
                    }

                    await _context.SaveChangesAsync();

                    var origin = Request.Headers["Origin"];
                    var forgotPasswordLink = $@"{origin}/forgot_password";

                    var emailBody = $@"Hi {existingUser.UserName},

Your password has been reset @HairdressingProject Admin Portal. If you have not made this request, please contact us or navigate to the page below to reset it again:

{forgotPasswordLink}

Regards,

HairdressingProject Admin.
";
                    try
                    {
                        _emailService.SendEmail(existingUser.UserEmail, existingUser.UserName, "Password successfully reset", emailBody);
                        return NoContent();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Failed to send email:");
                        Console.WriteLine(ex);

                        return StatusCode(StatusCodes.Status500InternalServerError, new { errors = new { Email = new string[] { ex.Message } } });
                    }
                }
                return NotFound(new { errors = new { Token = new string[] { "User not found" } }, status = 404 });
            }
            return NotFound(new { errors = new { Token = new string[] { "Token not found" } }, status = 404 });
        }

        // PUT: api/users/5/change_password : Method to change user password (based on user's ID).
        [HttpPut("{id:long}/change_password")]
        public async Task<IActionResult> SetNewPassword(ulong id, [FromBody] Users users)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            if (id != users.Id)
            {
                return BadRequest(new { errors = new { Id = new string[] { "ID sent does not match the one in the endpoint" } }, status = 400 });
            }

            var userMod = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (userMod == null)
            {
                return NotFound(new { errors = new { Id = new string[] { "User not found" } }, status = 404 });
            }

            userMod.UserPassword = users.UserPassword;

            _context.Entry(userMod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT api/users/5/change_role
        [HttpPut("{id}/change_role")]
        public async Task<IActionResult> ChangeUserRole(ulong id, [FromBody] ValidatedUserRoleModel user)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            if (id != user.Id)
            {
                return BadRequest(new { errors = new { Id = new string[] { "ID sent does not match the one in the endpoint" } }, status = 400 });
            }

            var userMod = await _context.Users.FirstOrDefaultAsync(u => u.Id == id && u.UserName == user.UserName && u.UserEmail == user.UserEmail);

            if (userMod == null)
            {
                return NotFound(new { errors = new { Id = new string[] { "User not found" } }, status = 404 });
            }

            userMod.UserRole = user.UserRole;

            _context.Entry(userMod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

// ********************************************************************************************************************************************        
        // POST api/users
        [EnableCors("Policy1")]
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers([FromBody] Users users)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            var existingUser = await _context.Users.AnyAsync(u => u.Id == users.Id || u.UserName == users.UserName || u.UserEmail == users.UserEmail);

            if (!existingUser)
            {
                if (users.Id != null)
                {
                    users.Id = null;
                }

                _context.Users.Add(users);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUsers", new { id = users.Id }, users.WithoutPassword());
            }

            // return Conflict(new { errors =  "User already exists" });
            return Conflict(new { errors = new { Users = new string[] { "User already exists" } }, status = 409 });
        }

        // POST api/users/sign_up
        [EnableCors("Policy1")]
        [HttpPost("sign_up")]
        public async Task<IActionResult> SignUp([FromBody] Users users)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == users.Id || u.UserName == users.UserName || u.UserEmail == users.UserEmail);

            if (user == null)
            {
                // New user, add to DB and authenticate
                // Also, validate/sanitise properties here

                if (users.Id != null)
                {
                    users.Id = null;
                }

                _context.Users.Add(users);

                await _context.SaveChangesAsync();

                // Get newly created user from database to create a new account record
                // Stored procedures would be preferred in this case in order to avoid making so many calls to the database
                var savedUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == users.UserName);

                // TODO: Handle the opposite case
                if (savedUser != null)
                {
                    _context.Accounts.Add(new Accounts { UserId = savedUser.Id });
                    await _context.SaveChangesAsync();
                }

                var authenticatedUser = await _userService.Authenticate(users.UserName, users.UserPassword);
                // var baseUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == authenticatedUser.Id);

                authenticatedUser.BaseUser = savedUser.WithoutPassword();

                // Send cookie with fresh token
                _authorizationService.SetAuthCookie(Request, Response, authenticatedUser.Token);

                authenticatedUser.Token = null;

                // Send back newly created user without token
                return CreatedAtAction(nameof(GetUser), new { authenticatedUser.Id }, authenticatedUser);
            }

            // Existing user, return 409 (Conflict)
            // Alternatively, refresh this user's token
            return Conflict(new { errors = new { Users = new string[] { "User already registered" } }, status = 409 });
        }

        // POST: api/users/sign_in
        [EnableCors("Policy1")]
        [HttpPost("sign_in")]
        public async Task<IActionResult> SignIn([FromBody] AuthenticatedUserModel user)
        {
            // Authenticate user
            var authenticatedUser = await _userService.Authenticate(user.UserNameOrEmail, user.UserPassword);

            if (authenticatedUser == null)
            {
                // User isn't registered
                return Unauthorized(new { errors = new { Authentication = new string[] { "Invalid username, email and/or password" } }, status = 401 });
            }

            // Return 200 OK with token in cookie
            var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.Id == authenticatedUser.Id);
            var mappedExistingUser = await MapFeaturesToUsers(existingUser);
            authenticatedUser.BaseUser = mappedExistingUser;
        
            _authorizationService.SetAuthCookie(Request, Response, authenticatedUser.Token);

            return Ok();
        }

        // POST: api/users/authenticate
        // This method is an alternative to sign in that validates the token directly
        [EnableCors("Policy1")]
        [HttpPost("authenticate")]
        public IActionResult AuthenticateUser()
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            return Ok();
        }

        // POST: api/users/forgot_password
        [EnableCors("Policy1")]
        [HttpPost("forgot_password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ValidatedUserEmailModel user)
        {
            var origin = Request.Headers["Origin"];

            if (string.IsNullOrEmpty(origin))
            {
                return BadRequest(new { errors = new { Origin = new string[] { "Request origin was not supplied" } }, status = 400 });
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.UserEmail == user.UserNameOrEmail || u.UserName == user.UserNameOrEmail);

            if (existingUser == null)
            {
                return NotFound(new { errors = new { UserNameOrEmail = new string[] { "Username/email is not registered" } }, status = 404 });
            }

            var existingAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.UserId == existingUser.Id);

            if (existingAccount == null)
            {
                return NotFound(new { errors = new { Account = new string[] { "Unable to retrieve account details" } }, status = 404 });
            }

            var recoverPasswordToken = Guid.NewGuid();

            await _context.Database.ExecuteSqlInterpolatedAsync($"UPDATE accounts SET recover_password_token = UNHEX(REPLACE({recoverPasswordToken}, {"-"}, {""})) WHERE user_id = {existingAccount.UserId}");            

            await _context.SaveChangesAsync();           

            var recoverPasswordLink = $@"{origin}/reset_password?token={recoverPasswordToken}";

            var emailBody = $@"Hi {existingUser.UserName},

It seems that you have requested to recover your password @HairdressingProject Admin Portal. If you have not, please ignore this email.

Use this link to do so: {recoverPasswordLink}

Regards,

HairdressingProject Admin.
";
            try
            {
                _emailService.SendEmail(existingUser.UserEmail, existingUser.UserName, "Recover Password", emailBody);
                return Ok();
            }
            catch(Exception ex)
            {
                Console.WriteLine("Failed to send email:");
                Console.WriteLine(ex);

                return StatusCode(StatusCodes.Status500InternalServerError, new { errors = new { Email = new string[] { ex.Message } } });
            }
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Users>> DeleteUsers(ulong id)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return users;
        }

        private bool UsersExists(ulong id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private async Task<Users> MapFeaturesToUsers(Users user) 
        {
            // map user features to this user
            var userFeatures = await _context.UserFeatures
            .Where(uf => uf.UserId == user.Id)
            .ToListAsync();

            user.UserFeatures = userFeatures;

            return user.WithoutPassword();

        }

        public async Task<IEnumerable<Users>> MapFeaturesToUsers()
        {
            
            var users = await _context.Users.ToListAsync();
            var userFeatures = await _context.UserFeatures.ToListAsync();

            var mappedUsers = users.Select(u => 
            {
                // map user features to all users
                var correspondingFeatures = userFeatures.FindAll(uf => (uf.UserId == u.Id));
                u.UserFeatures = correspondingFeatures;

                return u;
            });

            return mappedUsers.WithoutPasswords();
        }
    }
}
