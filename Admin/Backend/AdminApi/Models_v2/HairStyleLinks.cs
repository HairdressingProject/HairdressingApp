﻿using AdminApi.Validation;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminApi.Models_v2
{
    [Table("hair_style_links")]
    public partial class HairStyleLinks
    {
        [Key]
        [Column("id")]
        public ulong? Id { get; set; }

        [Required(ErrorMessage = "Hair style ID is required", AllowEmptyStrings = false)]
        [NotNullOrEmptyOrWhiteSpace(ErrorMessage = @"Hair style ID should not be empty or white space")]
        [RegularExpression(@"^[1-9]{1}$|^[1-9][0-9]+$", ErrorMessage = @"Hair style ID must only contain numbers (0 is not allowed)")]
        [Column("hair_style_id")]
        public ulong HairStyleId { get; set; }

        [Required(ErrorMessage = "Link name is required", AllowEmptyStrings = false)]
        [NotNullOrEmptyOrWhiteSpace(ErrorMessage = @"Link name should not be empty or white space")]
        [MaxLength(128)]
        [Column("link_name", TypeName = "varchar(128)")]
        public string LinkName { get; set; }

        [Required(ErrorMessage = "Link URL is required", AllowEmptyStrings = false)]
        [NotNullOrEmptyOrWhiteSpace(ErrorMessage = @"Link URL should not be empty or white space")]
        [MaxLength(512)]
        [Column("link_url", TypeName = "varchar(512)")]
        public string LinkUrl { get; set; }

        [Column("date_created", TypeName = "datetime")]
        public DateTime? DateCreated { get; set; }

        [Column("date_modified", TypeName = "datetime")]
        public DateTime? DateModified { get; set; }

        [ForeignKey(nameof(HairStyleId))]
        [InverseProperty(nameof(HairStyles.HairStyleLinks))]
        public virtual HairStyles HairStyle { get; set; }
    }
}
