using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using AdminApi.Entities;
using AdminApi.Helpers;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AdminApi.Models;

namespace AdminApi.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        Task<IEnumerable<Users>> GetAll();
    }

    public class UserService : IUserService
    {
        private readonly hair_project_dbContext _context;

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings, hair_project_dbContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public async Task<User> Authenticate(string username, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username && x.UserPassword == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var entityUser = new User(user.Id);
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, entityUser.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            entityUser.Token = tokenHandler.WriteToken(token);

            return entityUser;
        }

        public async Task<IEnumerable<Users>> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return users.WithoutPasswords();
        }
    }
}
