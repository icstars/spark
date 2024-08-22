using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace spark.Models
{
    public class Topic
    {
        public int id { get; set; }
        public int category_id { get; set; } // Foreign Key
        public string? name { get; set; }

        [ForeignKey("category_id")]
        public Category? category { get; set; }
        public ICollection<EvaluationOption>? EvaluationOptions { get; set; }
        public ICollection<TopicComment>? TopicComments { get; set; }
    }
}