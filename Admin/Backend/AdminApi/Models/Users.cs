using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AdminApi.Models
{
    public partial class Users
    {
        public Users()
        {
            UserFeatures = new HashSet<UserFeatures>();
        }

        /**
         * JsonPropertyNames are important to map each property from JSON POST/PUT requests to the corresponding column name in the database
         * Otherwise an exception may be thrown
         * An alternative is to import NewtonSoftJson and add this code to the ConfigureServices method in the Startup.cs file:
         * 
         * services
         * .AddControllers()
         * .AddNewtonsoftJson(options => 
         *                      options
         *                      .SerializerSettings
         *                      .ContractResolver = new DefaultContractResolver() 
         *                      { 
         *                          NamingStrategy = new SnakeCaseNamingStrategy() 
         *                      })
         * 
         * However, the solution in place uses the native System.Text.Json module
         * See: https://github.com/dotnet/runtime/issues/782
         * 
         */
        [JsonPropertyName("id")]
        public ulong Id { get; set; }

        //[Required] // Throw status 400 error. If not, throws mysql error
        [JsonPropertyName("user_name")]
        public string UserName { get; set; }

        //[Required]
        [JsonPropertyName("user_password")]
        public string UserPassword { get; set; }

        //[Required]
        [JsonPropertyName("user_email")]
        public string UserEmail { get; set; }

        //[Required]
        [JsonPropertyName("first_name")]
        public string FirstName { get; set; }

        [JsonPropertyName("last_name")]
        public string LastName { get; set; }

        [JsonPropertyName("user_role")]
        public string UserRole { get; set; }

        [JsonPropertyName("date_created")]
        public DateTime DateCreated { get; set; }

        [JsonPropertyName("date_modified")]
        public DateTime? DateModified { get; set; }

        [JsonPropertyName("user_features")]
        public virtual ICollection<UserFeatures> UserFeatures { get; set; }
    }
}
