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

        public async Task<bool> DeleteTodoById(int? id)
        {
            TodoEntity? obj = await _context.Todos.FindAsync(id);

            if (obj == null)
            {
                return false;
            }

            _context.Todos.Remove(obj);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<TodoEntity>> GetTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        public async Task<bool> UpdateTodoById(int? id, TodoEntity updatedObj)
        {
            var obj = await _context.Todos.FindAsync(id);

            if (obj == null)
            {
                return false;
            }

            if (updatedObj.IsCompleted != null)
            {
                obj.IsCompleted = updatedObj.IsCompleted;
            }

            if (updatedObj.TodoName != null)
            {
                obj.TodoName = updatedObj.TodoName;
            }

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
