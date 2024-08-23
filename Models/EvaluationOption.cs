using System.ComponentModel.DataAnnotations.Schema;
using spark.Models;

public class EvaluationOption
{
    public int id { get; set; }
    public int topic_id { get; set; } // Foreign Key
    public string? comment { get; set; }
    public int score { get; set; }

    // This corresponds to the EvaluationOptions collection in Topic
    [ForeignKey("topic_id")]
    public Topic? Topic { get; set; }

}
