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
    public class HairStyleLinksController : ControllerBase
    {
        private readonly hair_project_dbContext _context;

        public HairStyleLinksController(hair_project_dbContext context)
        {
            _context = context;
        }

        // GET: api/HairStyleLinks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HairStyleLinks>>> GetHairStyleLinks()
        {
            return await _context.HairStyleLinks.ToListAsync();
        }

        // GET: api/HairStyleLinks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HairStyleLinks>> GetHairStyleLinks(ulong id)
        {
            var hairStyleLinks = await _context.HairStyleLinks.FindAsync(id);

            if (hairStyleLinks == null)
            {
                return NotFound();
            }

            return hairStyleLinks;
        }

        // PUT: api/HairStyleLinks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHairStyleLinks(ulong id, HairStyleLinks hairStyleLinks)
        {
            if (id != hairStyleLinks.Id)
            {
                return BadRequest();
            }

            _context.Entry(hairStyleLinks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HairStyleLinksExists(id))
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

        // POST: api/HairStyleLinks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<HairStyleLinks>> PostHairStyleLinks(HairStyleLinks hairStyleLinks)
        {
            _context.HairStyleLinks.Add(hairStyleLinks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHairStyleLinks", new { id = hairStyleLinks.Id }, hairStyleLinks);
        }

        // DELETE: api/HairStyleLinks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HairStyleLinks>> DeleteHairStyleLinks(ulong id)
        {
            var hairStyleLinks = await _context.HairStyleLinks.FindAsync(id);
            if (hairStyleLinks == null)
            {
                return NotFound();
            }

            _context.HairStyleLinks.Remove(hairStyleLinks);
            await _context.SaveChangesAsync();

            return hairStyleLinks;
        }

        private bool HairStyleLinksExists(ulong id)
        {
            return _context.HairStyleLinks.Any(e => e.Id == id);
        }
    }
}
