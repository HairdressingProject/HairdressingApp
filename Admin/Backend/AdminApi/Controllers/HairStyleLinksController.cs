using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminApi.Models_v2;

namespace AdminApi.Controllers
{
    /**
     * HairStyleLinksController
     * This controller handles all routes in the format: "/api/hair_style_links/"
     * 
    **/
    // [Authorize]
    [Route("api/hair_style_links")]
    [ApiController]
    public class HairStyleLinksController : ControllerBase
    {
        private readonly hair_project_dbContext _context;
        private readonly Services.IAuthorizationService _authorizationService;

        public HairStyleLinksController(hair_project_dbContext context, Services.IAuthorizationService authorizationService)
        {
            _context = context;
            _authorizationService = authorizationService;
        }

        // GET: api/hair_style_links
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HairStyleLinks>>> GetHairStyleLinks()
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            return await _context.HairStyleLinks.ToListAsync();
        }

        // GET: api/hair_style_links/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HairStyleLinks>> GetHairStyleLinks(ulong id)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            var hairStyleLinks = await _context.HairStyleLinks.FindAsync(id);

            if (hairStyleLinks == null)
            {
                return NotFound();
            }

            return hairStyleLinks;
        }

        // PUT: api/hair_style_links/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHairStyleLinks(ulong id, [FromBody] HairStyleLinks hairStyleLinks)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            if (id != hairStyleLinks.Id)
            {
                return BadRequest(new { errors = new { Id = new string[] { "ID sent does not match the one in the endpoint" } }, status = 400 });
            }

            var correspondingHairStyle = await _context.HairStyles.FirstOrDefaultAsync(h => h.Id == hairStyleLinks.HairStyleId);

            if (correspondingHairStyle == null)
            {
                return NotFound(new { errors = new { HairStyleId = new string[] { "No matching hair style entry was found" } }, status = 404 });
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

        // POST /api/hair_style_links
        [HttpPost]
        public async Task<ActionResult<HairStyleLinks>> PostHairStyleLinks([FromBody] HairStyleLinks hairStyleLinks)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            var correspondingHairStyle = await _context.HairStyles.FirstOrDefaultAsync(h => h.Id == hairStyleLinks.HairStyleId);

            if (correspondingHairStyle == null)
            {
                return NotFound(new { errors = new { HairStyleId = new string[] { "No matching hair style entry was found" } }, status = 404 });
            }

            if (hairStyleLinks.Id != null)
            {
                hairStyleLinks.Id = null;
            }

            _context.HairStyleLinks.Add(hairStyleLinks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHairStyleLinks", new { id = hairStyleLinks.Id }, hairStyleLinks);
        }

        // DELETE: api/hair_style_links/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HairStyleLinks>> DeleteHairStyleLinks(ulong id)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

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
