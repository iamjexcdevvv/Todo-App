using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using TodoApplication.Core.Entities;
using TodoApplication.Core.Repositories;

namespace TodoApplication.Application.Features.UpdateTodoById
{
    public class UpdateTodoByIdCommandHandler : IRequestHandler<UpdateTodoByIdCommand, bool>
    {
        private readonly ITodoRepository _repository;
        public UpdateTodoByIdCommandHandler(ITodoRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(UpdateTodoByIdCommand request, CancellationToken cancellationToken)
        {
            TodoEntity todoObj = new TodoEntity
            {
                TodoName = request.updatedObj.TodoName,
                IsCompleted = request.updatedObj.IsCompleted
            };

            return await _repository.UpdateTodoById(request.id, todoObj);
        }
    }
}
