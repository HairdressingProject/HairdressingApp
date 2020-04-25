using AdminApi.Models;
using System;
using System.Collections.Generic;

namespace AdminApi.Entities
{
    public class User
    {
        public ulong Id { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string UserEmail { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserRole { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public virtual ICollection<UserFeatures> UserFeatures { get; set; }

        // This property stores the token needed for authentication
        public string Token { get; set; }

        public User(
                ulong id,
                string userName,
                string userPassword,
                string userEmail,
                string firstName,
                string lastName,
                string userRole,
                DateTime dateCreated,
                DateTime? dateModified,
                ICollection<UserFeatures> userFeatures,
                string token = null
            )
        {
            Id = id;
            UserName = userName;
            UserPassword = userPassword;
            UserEmail = userEmail;
            FirstName = firstName;
            LastName = lastName;
            UserRole = userRole;
            DateCreated = dateCreated;
            DateModified = dateModified;
            UserFeatures = userFeatures;
            Token = token;
        }
    }
}
