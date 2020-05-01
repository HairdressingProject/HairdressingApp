using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace AdminApi.Controllers
{
    /**
     * SkinTonesController
     * This controller handles all routes in the format: "/api/skin_tones/"
     * To disable authentication, simply comment out the [Authorize] annotation
     * 
    **/
    [Authorize]
    [Route("api/skin_tones")]
    [ApiController]
    public class SkinTonesController : ControllerBase
    {
        private readonly hair_project_dbContext _context;

        public SkinTonesController(hair_project_dbContext context)
        {
            _context = context;
        }

        // GET: api/SkinTones
        [EnableCors("Policy1")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SkinTones>>> GetSkinTones()
        {
            return await _context.SkinTones.ToListAsync();
        }

        // GET: api/SkinTones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SkinTones>> GetSkinTones(ulong id)
        {
            var skinTones = await _context.SkinTones.FindAsync(id);

            if (skinTones == null)
            {
                return NotFound();
            }

            return skinTones;
        }

        // PUT: api/SkinTones/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSkinTones(ulong id, SkinTones skinTones)
        {
            if (id != skinTones.Id)
            {
                return BadRequest();
            }

            _context.Entry(skinTones).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SkinTonesExists(id))
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

        // POST: api/SkinTones
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SkinTones>> PostSkinTones(SkinTones skinTones)
        {
            _context.SkinTones.Add(skinTones);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSkinTones", new { id = skinTones.Id }, skinTones);
        }

        // DELETE: api/SkinTones/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SkinTones>> DeleteSkinTones(ulong id)
        {
            var skinTones = await _context.SkinTones.FindAsync(id);
            if (skinTones == null)
            {
                return NotFound();
            }

            _context.SkinTones.Remove(skinTones);
            await _context.SaveChangesAsync();

            return skinTones;
        }

        private bool SkinTonesExists(ulong id)
        {
            return _context.SkinTones.Any(e => e.Id == id);
        }
    }
}
