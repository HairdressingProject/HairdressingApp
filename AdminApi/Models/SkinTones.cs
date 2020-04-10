using System;
using System.Collections.Generic;

namespace AdminApi.Models
{
    public partial class SkinTones
    {
        public SkinTones()
        {
            skinTonesLinks = new HashSet<skinTonesLinks>();
        }

        public ulong Id { get; set; }
        public string SkinToneName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }

        public virtual ICollection<skinTonesLinks> skinTonesLinks { get; set; }
    }
}
