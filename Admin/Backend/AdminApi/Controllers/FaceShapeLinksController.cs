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
    public class FaceShapeLinksController : ControllerBase
    {
        private readonly hair_project_dbContext _context;

        public FaceShapeLinksController(hair_project_dbContext context)
        {
            _context = context;
        }

        // GET: api/FaceShapeLinks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FaceShapeLinks>>> GetFaceShapeLinks()
        {
            return await _context.FaceShapeLinks.ToListAsync();
        }

        // GET: api/FaceShapeLinks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FaceShapeLinks>> GetFaceShapeLinks(ulong id)
        {
            var faceShapeLinks = await _context.FaceShapeLinks.FindAsync(id);

            if (faceShapeLinks == null)
            {
                return NotFound();
            }

            return faceShapeLinks;
        }

        // PUT: api/FaceShapeLinks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFaceShapeLinks(ulong id, FaceShapeLinks faceShapeLinks)
        {
            if (id != faceShapeLinks.Id)
            {
                return BadRequest();
            }

            _context.Entry(faceShapeLinks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FaceShapeLinksExists(id))
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

        // POST: api/FaceShapeLinks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FaceShapeLinks>> PostFaceShapeLinks(FaceShapeLinks faceShapeLinks)
        {
            _context.FaceShapeLinks.Add(faceShapeLinks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFaceShapeLinks", new { id = faceShapeLinks.Id }, faceShapeLinks);
        }

        // DELETE: api/FaceShapeLinks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FaceShapeLinks>> DeleteFaceShapeLinks(ulong id)
        {
            var faceShapeLinks = await _context.FaceShapeLinks.FindAsync(id);
            if (faceShapeLinks == null)
            {
                return NotFound();
            }

            _context.FaceShapeLinks.Remove(faceShapeLinks);
            await _context.SaveChangesAsync();

            return faceShapeLinks;
        }

        private bool FaceShapeLinksExists(ulong id)
        {
            return _context.FaceShapeLinks.Any(e => e.Id == id);
        }
    }
}