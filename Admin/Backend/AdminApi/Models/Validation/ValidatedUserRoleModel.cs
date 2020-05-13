﻿using AdminApi.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AdminApi.Models.Validation
{
    public class ValidatedUserRoleModel
    {
        [RegularExpression(@"^[1-9]{1}$|^[1-9][0-9]+$", ErrorMessage = @"Skin tone ID must only contain numbers (0 is not allowed)")]
        [JsonPropertyName("id")]
        public ulong Id { get; set; }

        [Required(ErrorMessage = "Username is required", AllowEmptyStrings = false)]
        [NotNullOrEmptyOrWhiteSpace(ErrorMessage = @"Username should not be empty or white space")]
        [MaxLength(32)]
        [JsonPropertyName("user_name")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email is required", AllowEmptyStrings = false)]
        [NotNullOrEmptyOrWhiteSpace(ErrorMessage = @"Email should not be empty or white space")]
        [MaxLength(512)]
        [JsonPropertyName("user_email")]
        public string UserEmail { get; set; }

        [NotNullOrEmptyOrWhiteSpace(ErrorMessage = @"User role should not be empty or white space")]
        [RequiredUserRole(AllowEmptyStrings = false, ErrorMessage = "Invalid user role.")]
        [JsonPropertyName("user_role")]
        public string UserRole { get; set; }
    }
}
