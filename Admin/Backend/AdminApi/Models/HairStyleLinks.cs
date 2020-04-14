using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AdminApi.Models
{
    public partial class HairStyleLinks
    {
        [JsonPropertyName("id")]
        public ulong Id { get; set; }

        [JsonPropertyName("hair_style_id")]
        public ulong HairStyleId { get; set; }

        [JsonPropertyName("link_name")]
        public string LinkName { get; set; }

        [JsonPropertyName("link_url")]
        public string LinkUrl { get; set; }

        [JsonPropertyName("date_created")]
        public DateTime DateCreated { get; set; }

        [JsonPropertyName("date_modified")]
        public DateTime? DateModified { get; set; }

        [JsonPropertyName("hair_style")]
        public virtual HairStyles HairStyle { get; set; }
    }
}
