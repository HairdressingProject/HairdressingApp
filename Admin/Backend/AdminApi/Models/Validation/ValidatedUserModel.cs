using System.ComponentModel.DataAnnotations;

namespace AdminApi.Validation
{
    public class ValidatedUserModel
    {
        [Required]
        [MinLength(1)]
        [MaxLength(512)]
        public string UserName { get; set; }

        [Required]
        [MinLength(6)]
        [MaxLength(512)]
        public string UserPassword { get; set; }
        
        public string Token { get; set; }
    }
}
