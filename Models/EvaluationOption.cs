using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace spark.Models
{
    public class EvaluationOption
    {
        public int id { get; set; }
        public int topic_id { get; set; } // Foreign Key
        public string? text { get; set; }
        public int score { get; set; }
        [ForeignKey("topic_id")]
        public Topic? Topic { get; set; }
      
    }
}