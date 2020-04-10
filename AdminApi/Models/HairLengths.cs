using System;
using System.Collections.Generic;

namespace AdminApi.Models
{
    public partial class HairLengths
    {
        public HairLengths()
        {
            HairLengthLinks = new HashSet<HairLengthLinks>();
        }

        public ulong Id { get; set; }
        public string HairLengthName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }

        public virtual ICollection<HairLengthLinks> HairLengthLinks { get; set; }
    }
}
