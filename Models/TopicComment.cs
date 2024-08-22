using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace spark.Models
{
    public class TopicComment
    {
        public int id { get; set; }
        public int topic_id { get; set; } // Foreign Key
        public string? comment { get; set; }
        public int form_id { get; set; } // Foreign Key

        [ForeignKey("topic_id")]
        public Topic? Topic { get; set; }

        [ForeignKey("form_id")]
        public EvaluationForm? EvaluationForm { get; set; }
    }
}