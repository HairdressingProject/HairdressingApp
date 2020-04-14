using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AdminApi.Models
{
    public partial class FaceShapes
    {
        public FaceShapes()
        {
            FaceShapeLinks = new HashSet<FaceShapeLinks>();
        }

        [JsonPropertyName("id")]
        public ulong Id { get; set; }

        [JsonPropertyName("shape_name")]
        public string ShapeName { get; set; }

        [JsonPropertyName("date_created")]
        public DateTime DateCreated { get; set; }

        [JsonPropertyName("date_modified")]
        public DateTime? DateModified { get; set; }

        [JsonPropertyName("face_shape_links")]
        public virtual ICollection<FaceShapeLinks> FaceShapeLinks { get; set; }
    }
}
