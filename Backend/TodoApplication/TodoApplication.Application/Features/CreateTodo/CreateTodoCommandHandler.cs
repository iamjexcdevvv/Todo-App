using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using TodoApplication.Core.Entities;
using TodoApplication.Core.Repositories;

namespace TodoApplication.Application.Features.CreateTodo
{
    public class CreateTodoCommandHandler : IRequestHandler<CreateTodoCommand, int>
    {
        private readonly ITodoRepository _todoRepository;
        public CreateTodoCommandHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<int> Handle(CreateTodoCommand request, CancellationToken cancellationToken)
        {
            TodoEntity newTodo = new TodoEntity
            {
                TodoName = request.TodoName,
                IsCompleted = request.IsCompleted
            };

            return await _todoRepository.CreateTodo(newTodo);
        }
    }
}
