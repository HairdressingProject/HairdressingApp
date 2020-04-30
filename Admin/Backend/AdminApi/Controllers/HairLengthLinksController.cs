using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace AdminApi.Controllers
{
    /**
     * HairLengthLinksController
     * This controller handles all routes in the format: "/api/hair_length_links/"
     * To disable authentication, simply comment out the [Authorize] annotation
     * 
    **/
    [Authorize]
    [Route("api/hair_length_links")]
    [ApiController]
    public class HairLengthLinksController : ControllerBase
    {
        private readonly hair_project_dbContext _context;

        public HairLengthLinksController(hair_project_dbContext context)
        {
            _context = context;
        }

        // GET: api/HairLengthLinks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HairLengthLinks>>> GetHairLengthLinks()
        {
            return await _context.HairLengthLinks.ToListAsync();
        }

        // GET: api/HairLengthLinks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HairLengthLinks>> GetHairLengthLinks(ulong id)
        {
            var hairLengthLinks = await _context.HairLengthLinks.FindAsync(id);

            if (hairLengthLinks == null)
            {
                return NotFound();
            }

            return hairLengthLinks;
        }

        // PUT: api/HairLengthLinks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHairLengthLinks(ulong id, HairLengthLinks hairLengthLinks)
        {
            if (id != hairLengthLinks.Id)
            {
                return BadRequest();
            }

            _context.Entry(hairLengthLinks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HairLengthLinksExists(id))
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

        // POST: api/HairLengthLinks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<HairLengthLinks>> PostHairLengthLinks(HairLengthLinks hairLengthLinks)
        {
            _context.HairLengthLinks.Add(hairLengthLinks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHairLengthLinks", new { id = hairLengthLinks.Id }, hairLengthLinks);
        }

        // DELETE: api/HairLengthLinks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HairLengthLinks>> DeleteHairLengthLinks(ulong id)
        {
            var hairLengthLinks = await _context.HairLengthLinks.FindAsync(id);
            if (hairLengthLinks == null)
            {
                return NotFound();
            }

            _context.HairLengthLinks.Remove(hairLengthLinks);
            await _context.SaveChangesAsync();

            return hairLengthLinks;
        }

        private bool HairLengthLinksExists(ulong id)
        {
            return _context.HairLengthLinks.Any(e => e.Id == id);
        }
    }
}
