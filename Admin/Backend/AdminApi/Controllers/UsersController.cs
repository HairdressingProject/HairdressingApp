using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminApi.Models;

namespace AdminApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly hair_project_dbContext _context;

        public UsersController(hair_project_dbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {

            var mappedUsers = await MapFeaturesToUsers();

            return Ok(mappedUsers);

            // return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(ulong id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            else
            {
                var mappedUser = await MapFeaturesToUsers(user);
                return Ok(user);
            }

            // return users;
        }

// ********************************************************************************************************************************************        
        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(ulong id, Users users)
        {
            if (id != users.Id)
            {
                return BadRequest();
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


        // PUT: api/Users/5/permissions : Method to change user password. ToDo: Must be authorized
        
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}/permissions")]
        public async Task<IActionResult> SetNewPassword(ulong id, Users users)
        {

            // Console.WriteLine(users.UserPassword); 

            var userMod = await _context.Users.SingleOrDefaultAsync(u => u.Id == id);


            if (userMod == null)
            {
                return BadRequest();
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

// ********************************************************************************************************************************************        

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }

        // DELETE: api/Users/5
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

            return user;

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

            return mappedUsers;

        }


    }
}
