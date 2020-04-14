using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AdminApi.Models
{
    public partial class UserFeatures
    {
        [JsonPropertyName("id")]
        public ulong Id { get; set; }

        [JsonPropertyName("user_id")]
        public ulong UserId { get; set; }

        [JsonPropertyName("face_shape_id")]
        public long FaceShapeId { get; set; }

        [JsonPropertyName("skin_tone_id")]
        public long SkinToneId { get; set; }

        [JsonPropertyName("hair_style_id")]
        public long HairStyleId { get; set; }

        [JsonPropertyName("hair_length_id")]
        public long HairLengthId { get; set; }

        [JsonPropertyName("hair_colour_id")]
        public long HairColourId { get; set; }

        [JsonPropertyName("date_created")]
        public DateTime DateCreated { get; set; }

        [JsonPropertyName("date_modified")]
        public DateTime? DateModified { get; set; }

        [JsonPropertyName("user")]
        public virtual Users User { get; set; }
    }
}
