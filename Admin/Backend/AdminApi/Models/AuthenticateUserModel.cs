using System.ComponentModel.DataAnnotations;

namespace AdminApi.Models
{
    public class AuthenticateUserModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string UserPassword { get; set; }
    }
}
