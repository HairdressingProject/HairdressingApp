using AdminApi.Models;
using System;
using System.Collections.Generic;

namespace AdminApi.Entities
{
    public class User
    {
        public ulong Id { get; set; }

        // This property stores the token needed for authentication
        public string Token { get; set; }

        public User(ulong id, string token = null)
        {
            Id = id;
            Token = token;
        }
    }
}
