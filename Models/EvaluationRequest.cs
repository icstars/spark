using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spark.Models
{
    public class EvaluationRequest
    {
        public EvaluationForm? form { get; set; }
        public List<EvaluationOption>? options { get; set; }
        public List<EvaluationOption>? comment { get; set; }
        public CategoryComment? categoryComment { get; set; }
    }
}