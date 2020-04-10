using System;
using System.Collections.Generic;

namespace AdminApi.Models
{
    public partial class HairStyleLinks
    {
        public ulong Id { get; set; }
        public ulong HairStyleId { get; set; }
        public string LinkName { get; set; }
        public string LinkUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }

        public virtual HairStyles HairStyle { get; set; }
    }
}
