using AdminApi.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AdminApi.Models.Validation
{
    public class RequiredUserRole : RequiredAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null) return false;

            return string.Equals(value.ToString(), value.ToString().Trim()) && Enum.TryParse<UserRoles>(value.ToString().ToUpper(), out _);
        }
    }
}
