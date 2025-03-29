using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApplication.Core.Entities;

namespace TodoApplication.Core.Repositories
{
    public interface ITodoRepository
    {
        Task<int> CreateTodo(TodoEntity todoObj);
        Task<List<TodoEntity>> GetTodos();
        Task<bool> UpdateTodoStatusById(int? id, bool isCompleted);
    }
}
