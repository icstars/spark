using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace spark.Models
{
    public class EvaluationForm
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public DateTime? created { get; set; }
        public int department_id { get; set; }
        public int manager_id { get; set; }
        public bool is_ready { get; set; }
        public int option_id { get; set; } // Foreign Key



        [ForeignKey("option_id")]
        public EvaluationOption? EvaluationOption { get; set; }
    }
}