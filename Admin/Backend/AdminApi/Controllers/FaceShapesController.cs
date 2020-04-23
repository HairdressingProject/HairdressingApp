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
    public class FaceShapesController : ControllerBase
    {
        private readonly hair_project_dbContext _context;

        public FaceShapesController(hair_project_dbContext context)
        {
            _context = context;
        }

        // GET: api/FaceShapes
        [EnableCors("Policy1")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FaceShapes>>> GetFaceShapes()
        {
            return await _context.FaceShapes.ToListAsync();
        }

        // GET: api/FaceShapes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FaceShapes>> GetFaceShapes(ulong id)
        {
            var faceShapes = await _context.FaceShapes.FindAsync(id);

            if (faceShapes == null)
            {
                return NotFound();
            }

            return faceShapes;
        }

        // PUT: api/FaceShapes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFaceShapes(ulong id, FaceShapes faceShapes)
        {
            if (id != faceShapes.Id)
            {
                return BadRequest();
            }

            _context.Entry(faceShapes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FaceShapesExists(id))
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

        // POST: api/FaceShapes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [EnableCors("Policy1")]
        [HttpPost]
        public async Task<ActionResult<FaceShapes>> PostFaceShapes(FaceShapes faceShapes)
        {
            _context.FaceShapes.Add(faceShapes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFaceShapes", new { id = faceShapes.Id }, faceShapes);
        }

        // DELETE: api/FaceShapes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FaceShapes>> DeleteFaceShapes(ulong id)
        {
            var faceShapes = await _context.FaceShapes.FindAsync(id);
            if (faceShapes == null)
            {
                return NotFound();
            }

            _context.FaceShapes.Remove(faceShapes);
            await _context.SaveChangesAsync();

            return faceShapes;
        }

        private bool FaceShapesExists(ulong id)
        {
            return _context.FaceShapes.Any(e => e.Id == id);
        }
    }
}
