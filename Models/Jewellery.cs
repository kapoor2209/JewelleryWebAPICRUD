using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace JewelleryWebAPICRUD.Models
{
    public class Jewellery
    {
        // creating a primary key identity for table jewellery
        [Key]
        public int Id { get; set; }
        // creating jewellery type
        public string Type { get; set; }
        // jewellery metal
        public string Metal { get; set; }
        // jewellery price
        public double Price { get; set; }
        // does jewellery has gem stones
        public string IsGemsFitted { get; set; }
    }
}