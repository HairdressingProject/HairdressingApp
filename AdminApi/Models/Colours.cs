using System;
using System.Collections.Generic;

namespace AdminApi.Models
{
    public partial class Colours
    {
        public ulong Id { get; set; }
        public string ColourName { get; set; }
        public string ColourHash { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
    }
}
