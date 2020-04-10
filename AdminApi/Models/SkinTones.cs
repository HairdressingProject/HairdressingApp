using System;
using System.Collections.Generic;

namespace AdminApi.Models
{
    public partial class SkinTones
    {
        public SkinTones()
        {
            SkisToneLinks = new HashSet<SkisToneLinks>();
        }

        public ulong Id { get; set; }
        public string SkinToneName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }

        public virtual ICollection<SkisToneLinks> SkisToneLinks { get; set; }
    }
}
