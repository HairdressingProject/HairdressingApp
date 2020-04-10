using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AdminApi.Models
{
    public partial class FaceShapeLinks
    {
        [JsonPropertyName("id")]
        public ulong Id { get; set; }

        [JsonPropertyName("face_shape_id")]
        public ulong FaceShapeId { get; set; }

        [JsonPropertyName("link_name")]
        public string LinkName { get; set; }

        [JsonPropertyName("link_url")]
        public string LinkUrl { get; set; }

        [JsonPropertyName("date_created")]
        public DateTime DateCreated { get; set; }

        [JsonPropertyName("date_modified")]
        public DateTime? DateModified { get; set; }

        [JsonPropertyName("face_shape")]
        public virtual FaceShapes FaceShape { get; set; }
    }
}
