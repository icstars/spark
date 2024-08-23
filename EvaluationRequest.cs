public class EvaluationRequest
{
    public int UserId { get; set; }  // ID пользователя, который заполняет форму
    public int ManagerId { get; set; }  // ID менеджера
    public int DepartmentId { get; set; }  // ID департамента
    public List<SelectedOption>? SelectedOptions { get; set; }  // Выбранные опции
    public List<TopicCommentDto>? TopicComments { get; set; }  // Комментарии по темам
    public List<CategoryCommentDto>? CategoryComments { get; set; }  // Комментарии по категориям
}

public class SelectedOption
{
    public int TopicId { get; set; }  // ID темы
    public int OptionId { get; set; }  // ID выбранной опции
}

public class TopicCommentDto
{
    public int TopicId { get; set; }
    public string? Comment { get; set; }
}

public class CategoryCommentDto
{
    public int CategoryId { get; set; }
    public string? Comment { get; set; }
}
