using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoApplication.Core.Entities;
using TodoApplication.Core.Repositories;
using TodoApplication.Infrastructure.Context;

namespace TodoApplication.Infrastructure.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly ApplicationDbContext _context;
        public TodoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateTodo(TodoEntity todoObj)
        {
            await _context.Todos.AddAsync(todoObj);
            await _context.SaveChangesAsync();

            return todoObj.Id;
        }

        public async Task<List<TodoEntity>> GetTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        public async Task<bool> UpdateTodoStatusById(int? id, bool isCompleted)
        {
            var obj = await _context.Todos.FindAsync(id);

            if (obj == null)
            {
                return false;
            }

            obj.IsCompleted = isCompleted;
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
