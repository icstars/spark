using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spark.Models
{
    public class EvaluationRequest
    {
        public int UserId { get; set; }  // Matches 'userId' in the payload
    public int DepartmentId { get; set; }  // Matches 'departmentId' in the payload
    public int ManagerId { get; set; }  // Matches 'managerId' in the payload

    public List<SelectedOption>? SelectedOptions { get; set; }  // Matches 'selectedOptions' in the payload
    public List<EvaluationOption>? TopicComments { get; set; }  // Matches 'topicComments' in the payload
    public List<CategoryComment>? CategoryComments { get; set; }  // Matches 'categoryComments' in the payload
    }
}