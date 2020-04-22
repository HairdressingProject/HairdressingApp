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
    public class HairLengthsController : ControllerBase
    {
        private readonly hair_project_dbContext _context;

        public HairLengthsController(hair_project_dbContext context)
        {
            _context = context;
        }

        // GET: api/HairLengths
        [EnableCors("Policy1")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HairLengths>>> GetHairLengths()
        {
            return await _context.HairLengths.ToListAsync();
        }

        // GET: api/HairLengths/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HairLengths>> GetHairLengths(ulong id)
        {
            var hairLengths = await _context.HairLengths.FindAsync(id);

            if (hairLengths == null)
            {
                return NotFound();
            }

            return hairLengths;
        }

        // PUT: api/HairLengths/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHairLengths(ulong id, HairLengths hairLengths)
        {
            if (id != hairLengths.Id)
            {
                return BadRequest();
            }

            _context.Entry(hairLengths).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HairLengthsExists(id))
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

        // POST: api/HairLengths
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<HairLengths>> PostHairLengths(HairLengths hairLengths)
        {
            _context.HairLengths.Add(hairLengths);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHairLengths", new { id = hairLengths.Id }, hairLengths);
        }

        // DELETE: api/HairLengths/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HairLengths>> DeleteHairLengths(ulong id)
        {
            var hairLengths = await _context.HairLengths.FindAsync(id);
            if (hairLengths == null)
            {
                return NotFound();
            }

            _context.HairLengths.Remove(hairLengths);
            await _context.SaveChangesAsync();

            return hairLengths;
        }

        private bool HairLengthsExists(ulong id)
        {
            return _context.HairLengths.Any(e => e.Id == id);
        }
    }
}
