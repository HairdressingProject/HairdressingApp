using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AdminApi.Models
{
    public partial class Colours
    {
        [JsonPropertyName("id")]
        public ulong Id { get; set; }

        [JsonPropertyName("colour_name")]
        public string ColourName { get; set; }

        [JsonPropertyName("colour_hash")]
        public string ColourHash { get; set; }

        [JsonPropertyName("date_created")]
        public DateTime DateCreated { get; set; }

        [JsonPropertyName("date_modified")]
        public DateTime? DateModified { get; set; }
    }
}
