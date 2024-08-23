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

        public List<EvaluationOptionDto>? EvaluationOptions { get; set; }  // Matches 'topicComments' in the payload
        public List<CategoryCommentDto>? CategoryComments { get; set; }  // Matches 'categoryComments' in the payload
         public List<TopicDto>? Topic { get; set; }  // Matches 'categoryComments' in the payload
    }


    public class EvaluationOptionDto
    {
        public int TopicId { get; set; }
        public string? Comment { get; set; }
        public int Score { get; set; }
    }

    public class TopicDto
    {
        public int CategoryId { get; set; }
    }

    public class CategoryCommentDto
    {
        public int CategoryId { get; set; }
        public string? Comment { get; set; }
        public int FormId { get; set; }
    }

}