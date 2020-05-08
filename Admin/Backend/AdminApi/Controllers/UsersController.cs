using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminApi.Models;
using AdminApi.Validation;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using AdminApi.Services;
using AdminApi.Helpers;

namespace AdminApi.Controllers
{
    /**
     * UsersController
     * This controller handles all routes in the format: "/api/users/"
     * To disable authentication, simply comment out the [Authorize] annotation
     * 
    **/
    [Authorize]
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly hair_project_dbContext _context;
        private IUserService _userService;

        public UsersController(hair_project_dbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        // GET: api/users
        [EnableCors("Policy1")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            var mappedUsers = await MapFeaturesToUsers();
            var mappedUsersWithoutPasswords = mappedUsers.WithoutPasswords();

            var usersResponse = new
            {
                users = mappedUsersWithoutPasswords
            };

            return Ok(usersResponse);

            // return await _context.Users.ToListAsync();
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUser(ulong id)
        {
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

// ********************************************************************************************************************************************        
        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(ulong id, [FromBody] Users users)
        {
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


        // PUT: api/users/5/change_password : Method to change user password. ToDo: Must be authorized
        [HttpPut("{id}/change_password")]
        public async Task<IActionResult> SetNewPassword(ulong id, [FromBody] Users users)
        {
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
        public async Task<IActionResult> ChangeUserRole(ulong id, [FromBody] Users user)
        {
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
        [AllowAnonymous]
        [EnableCors("Policy1")]
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers([FromBody] Users users)
        {
            var existingUser = await _context.Users.AnyAsync(u => u.Id == users.Id || u.UserName == users.UserName || u.UserEmail == users.UserEmail);

            if (!existingUser)
            {
                if (users.Id != null)
                {
                    users.Id = null;
                }

                _context.Users.Add(users);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUsers", new { id = users.Id }, users);
            }

            return Conflict(new { error = "User already exists" });
        }

        // POST api/users/sign_up
        [AllowAnonymous]
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

                var authenticatedUser = await _userService.Authenticate(users.UserName, users.UserPassword);
                var baseUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == authenticatedUser.Id);

                authenticatedUser.BaseUser = baseUser.WithoutPassword();

                // Send back newly created user with token
                return CreatedAtAction(nameof(GetUser), new { authenticatedUser.Id }, authenticatedUser);
            }

            // Existing user, return 409 (Conflict)
            // Alternatively, refresh this user's token
            return Conflict(new { error = "User already registered" });
        }

        // POST: api/users/sign_in
        [AllowAnonymous]
        [EnableCors("Policy1")]
        [HttpPost("sign_in")]
        public async Task<IActionResult> SignIn([FromBody] AuthenticatedUserModel user)
        {
            // Authenticate user
            var authenticatedUser = await _userService.Authenticate(user.UserNameOrEmail, user.UserPassword);

            if (authenticatedUser == null)
            {
                // User isn't registered
                return Unauthorized(new { error = "Invalid username, email and/or password" });
            }

            // Return JSON response with token
            var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.Id == authenticatedUser.Id);
            var mappedExistingUser = await MapFeaturesToUsers(existingUser);
            authenticatedUser.BaseUser = mappedExistingUser;

            return Ok(authenticatedUser);
        }

        // POST: api/users/authenticate
        // This method is an alternative to sign in that validates the token directly
        [AllowAnonymous]
        [EnableCors("Policy1")]
        [HttpPost("authenticate")]
        public IActionResult AuthenticateUser([FromBody] Token token)
        {
            var isTokenValid = _userService.ValidateUserToken(token.UserToken);

            if (isTokenValid)
            {
                return Ok(token);
            }

            return Unauthorized(new { errors = new { UserToken = new string[] { "Invalid token" } }, status = 401 });
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Users>> DeleteUsers(ulong id)
        {
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
