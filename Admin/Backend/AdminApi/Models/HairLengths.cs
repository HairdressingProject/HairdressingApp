using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AdminApi.Models
{
    public partial class HairLengths
    {
        public HairLengths()
        {
            HairLengthLinks = new HashSet<HairLengthLinks>();
        }

        [JsonPropertyName("id")]
        public ulong Id { get; set; }

        [JsonPropertyName("hair_length_name")]
        public string HairLengthName { get; set; }

        [JsonPropertyName("date_created")]
        public DateTime DateCreated { get; set; }

        [JsonPropertyName("date_modified")]
        public DateTime? DateModified { get; set; }

        [JsonPropertyName("hair_length_links")]
        public virtual ICollection<HairLengthLinks> HairLengthLinks { get; set; }
    }
}
