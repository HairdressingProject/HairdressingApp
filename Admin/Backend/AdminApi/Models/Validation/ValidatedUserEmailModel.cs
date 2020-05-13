using AdminApi.Validation;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AdminApi.Models.Validation
{
    public class ValidatedUserEmailModel
    {
        [Required(ErrorMessage = "Email is required", AllowEmptyStrings = false)]
        [NotNullOrEmptyOrWhiteSpace(ErrorMessage = @"Email should not be empty or white space")]
        [MaxLength(512)]
        [JsonPropertyName("user_email")]
        public string UserEmail { get; set; }
    }
}
