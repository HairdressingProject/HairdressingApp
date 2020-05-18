﻿using AdminApi.Validation;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminApi.Models_v2
{
    [Table("colours")]
    public partial class Colours
    {
        [Key]
        [Column("id")]
        public ulong? Id { get; set; }

        [Required(ErrorMessage = "Colour name is required", AllowEmptyStrings = false)]
        [NotNullOrEmptyOrWhiteSpace(ErrorMessage = @"Colour name should not be empty or white space")]
        [MaxLength(64)]
        [Column("colour_name", TypeName = "varchar(64)")]
        public string ColourName { get; set; }

        [Required(ErrorMessage = "Colour hash is required", AllowEmptyStrings = false)]
        [NotNullOrEmptyOrWhiteSpace(ErrorMessage = @"Colour hash should not be empty or white space")]
        [RegularExpression(@"^(#[a-fA-F0-9]{3}$)|(#[a-fA-F0-9]{6}$)",
            ErrorMessage = @"The colour hash must be a HEX code with one of the following patterns: #333 or #333333")]
        [Column("colour_hash", TypeName = "varchar(64)")]
        public string ColourHash { get; set; }

        [Column("date_created", TypeName = "datetime")]
        public DateTime? DateCreated { get; set; }
        [Column("date_modified", TypeName = "datetime")]
        public DateTime? DateModified { get; set; }
    }
}
