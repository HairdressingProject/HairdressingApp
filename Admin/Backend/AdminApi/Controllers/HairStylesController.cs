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
    public class HairStylesController : ControllerBase
    {
        private readonly hair_project_dbContext _context;

        public HairStylesController(hair_project_dbContext context)
        {
            _context = context;
        }

        // GET: api/HairStyles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HairStyles>>> GetHairStyles()
        {
            return await _context.HairStyles.ToListAsync();
        }

        // GET: api/HairStyles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HairStyles>> GetHairStyles(ulong id)
        {
            var hairStyles = await _context.HairStyles.FindAsync(id);

            if (hairStyles == null)
            {
                return NotFound();
            }

            return hairStyles;
        }

        // PUT: api/HairStyles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHairStyles(ulong id, HairStyles hairStyles)
        {
            if (id != hairStyles.Id)
            {
                return BadRequest();
            }

            _context.Entry(hairStyles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HairStylesExists(id))
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

        // POST: api/HairStyles
        [HttpPost]
        public async Task<ActionResult<HairStyles>> PostHairStyles(HairStyles hairStyles)
        {
            _context.HairStyles.Add(hairStyles);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHairStyles", new { id = hairStyles.Id }, hairStyles);
        }

        // DELETE: api/HairStyles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HairStyles>> DeleteHairStyles(ulong id)
        {
            var hairStyles = await _context.HairStyles.FindAsync(id);
            if (hairStyles == null)
            {
                return NotFound();
            }

            _context.HairStyles.Remove(hairStyles);
            await _context.SaveChangesAsync();

            return hairStyles;
        }

        private bool HairStylesExists(ulong id)
        {
            return _context.HairStyles.Any(e => e.Id == id);
        }
    }
}
