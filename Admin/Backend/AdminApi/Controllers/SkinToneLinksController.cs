using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminApi.Models_v2;

namespace AdminApi.Controllers
{
    /**
     * SkinToneLinksController
     * This controller handles all routes in the format: "/api/skin_tone_links/"
     * 
    **/
    // [Authorize]
    [Route("api/skin_tone_links")]
    [ApiController]
    public class SkinToneLinksController : ControllerBase
    {
        private readonly hair_project_dbContext _context;
        private readonly Services.IAuthorizationService _authorizationService;

        public SkinToneLinksController(hair_project_dbContext context, Services.IAuthorizationService authorizationService)
        {
            _context = context;
            _authorizationService = authorizationService;
        }

        // GET: api/skin_tone_links
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SkinToneLinks>>> GetSkinToneLinks()
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            return await _context.SkinToneLinks.ToListAsync();
        }

        // GET: api/skin_tone_links/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SkinToneLinks>> GetSkinToneLinks(ulong id)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            var skinToneLinks = await _context.SkinToneLinks.FindAsync(id);

            if (skinToneLinks == null)
            {
                return NotFound();
            }

            return skinToneLinks;
        }

        // PUT: api/skin_tone_links/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSkinToneLinks(ulong id, [FromBody] SkinToneLinks skinToneLinks)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            if (id != skinToneLinks.Id)
            {
                return BadRequest(new { errors = new { Id = new string[] { "ID sent does not match the one in the endpoint" } }, status = 400 });
            }

            var correspondingSkinTone = await _context.SkinTones.FirstOrDefaultAsync(h => h.Id == skinToneLinks.SkinToneId);

            if (correspondingSkinTone == null)
            {
                return NotFound(new { errors = new { SkinToneId = new string[] { "No matching skin tone entry was found" } }, status = 404 });
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

        // POST: api/skin_tone_links
        [HttpPost]
        public async Task<ActionResult<SkinToneLinks>> PostSkinToneLinks(SkinToneLinks skinToneLinks)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

            var correspondingSkinTone = await _context.SkinTones.FirstOrDefaultAsync(h => h.Id == skinToneLinks.SkinToneId);

            if (correspondingSkinTone == null)
            {
                return NotFound(new { errors = new { SkinToneId = new string[] { "No matching skin tone entry was found" } }, status = 404 });
            }

            if (skinToneLinks.Id != null)
            {
                skinToneLinks.Id = null;
            }

            _context.SkinToneLinks.Add(skinToneLinks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSkinToneLinks", new { id = skinToneLinks.Id }, skinToneLinks);
        }

        // DELETE: api/skin_tone_links/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SkinToneLinks>> DeleteSkinToneLinks(ulong id)
        {
            if (!_authorizationService.ValidateJWTCookie(Request))
            {
                return Unauthorized(new { errors = new { Token = new string[] { "Invalid token" } }, status = 401 });
            }

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
