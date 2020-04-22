using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminApi.Models;
using Microsoft.AspNetCore.Cors;

namespace AdminApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFeaturesController : ControllerBase
    {
        private readonly hair_project_dbContext _context;

        public UserFeaturesController(hair_project_dbContext context)
        {
            _context = context;
        }

        // GET: api/UserFeatures
        [EnableCors("Policy1")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserFeatures>>> GetUserFeatures()
        {
            return await _context.UserFeatures.ToListAsync();
        }

        // GET: api/UserFeatures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserFeatures>> GetUserFeatures(ulong id)
        {
            var userFeatures = await _context.UserFeatures.FindAsync(id);

            if (userFeatures == null)
            {
                return NotFound();
            }

            return userFeatures;
        }

        // PUT: api/UserFeatures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserFeatures(ulong id, UserFeatures userFeatures)
        {
            if (id != userFeatures.Id)
            {
                return BadRequest();
            }

            _context.Entry(userFeatures).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserFeaturesExists(id))
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

        // POST: api/UserFeatures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UserFeatures>> PostUserFeatures(UserFeatures userFeatures)
        {
            _context.UserFeatures.Add(userFeatures);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserFeatures", new { id = userFeatures.Id }, userFeatures);
        }

        // DELETE: api/UserFeatures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserFeatures>> DeleteUserFeatures(ulong id)
        {
            var userFeatures = await _context.UserFeatures.FindAsync(id);
            if (userFeatures == null)
            {
                return NotFound();
            }

            _context.UserFeatures.Remove(userFeatures);
            await _context.SaveChangesAsync();

            return userFeatures;
        }

        private bool UserFeaturesExists(ulong id)
        {
            return _context.UserFeatures.Any(e => e.Id == id);
        }
    }
}
