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
    public class ColoursController : ControllerBase
    {
        private readonly hair_project_dbContext _context;

        public ColoursController(hair_project_dbContext context)
        {
            _context = context;
        }

        // GET: api/Colours
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Colours>>> GetColours()
        {
            return await _context.Colours.ToListAsync();
        }

        // GET: api/Colours/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Colours>> GetColours(ulong id)
        {
            var colours = await _context.Colours.FindAsync(id);

            if (colours == null)
            {
                return NotFound();
            }

            return colours;
        }

        // PUT: api/Colours/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColours(ulong id, Colours colours)
        {
            if (id != colours.Id)
            {
                return BadRequest();
            }

            _context.Entry(colours).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColoursExists(id))
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

        // POST: api/Colours
        [HttpPost]
        public async Task<ActionResult<Colours>> PostColours(Colours colours)
        {
            _context.Colours.Add(colours);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetColours", new { id = colours.Id }, colours);
        }

        // DELETE: api/Colours/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Colours>> DeleteColours(ulong id)
        {
            var colours = await _context.Colours.FindAsync(id);
            if (colours == null)
            {
                return NotFound();
            }

            _context.Colours.Remove(colours);
            await _context.SaveChangesAsync();

            return colours;
        }

        private bool ColoursExists(ulong id)
        {
            return _context.Colours.Any(e => e.Id == id);
        }
    }
}
