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
    public class SkinToneLinksController : ControllerBase
    {
        private readonly hair_project_dbContext _context;

        public SkinToneLinksController(hair_project_dbContext context)
        {
            _context = context;
        }

        // GET: api/SkinToneLinks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SkinToneLinks>>> GetSkinToneLinks()
        {
            return await _context.SkinToneLinks.ToListAsync();
        }

        // GET: api/SkinToneLinks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SkinToneLinks>> GetSkinToneLinks(ulong id)
        {
            var skinToneLinks = await _context.SkinToneLinks.FindAsync(id);

            if (skinToneLinks == null)
            {
                return NotFound();
            }

            return skinToneLinks;
        }

        // PUT: api/SkinToneLinks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSkinToneLinks(ulong id, SkinToneLinks skinToneLinks)
        {
            if (id != skinToneLinks.Id)
            {
                return BadRequest();
            }

            _context.Entry(skinToneLinks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SkinToneLinksExists(id))
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

        // POST: api/SkinToneLinks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SkinToneLinks>> PostSkinToneLinks(SkinToneLinks skinToneLinks)
        {
            _context.SkinToneLinks.Add(skinToneLinks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSkinToneLinks", new { id = skinToneLinks.Id }, skinToneLinks);
        }

        // DELETE: api/SkinToneLinks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SkinToneLinks>> DeleteSkinToneLinks(ulong id)
        {
            var skinToneLinks = await _context.SkinToneLinks.FindAsync(id);
            if (skinToneLinks == null)
            {
                return NotFound();
            }

            _context.SkinToneLinks.Remove(skinToneLinks);
            await _context.SaveChangesAsync();

            return skinToneLinks;
        }

        private bool SkinToneLinksExists(ulong id)
        {
            return _context.SkinToneLinks.Any(e => e.Id == id);
        }
    }
}
