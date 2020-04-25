using System.Collections.Generic;
using System.Linq;
using AdminApi.Entities;
using AdminApi.Models;

namespace AdminApi.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<User> WithoutPasswords(this IEnumerable<User> users)
        {
            return users.Select(x => x.WithoutPassword());
        }

        public static IEnumerable<Users> WithoutPasswords(this IEnumerable<Users> users)
        {
            return users.Select(x => x.WithoutPassword());
        }

        public static User WithoutPassword(this User user)
        {
            user.UserPassword = null;
            return user;
        }

        public static Users WithoutPassword(this Users user)
        {
            user.UserPassword = null;
            return user;
        }
    }
}
