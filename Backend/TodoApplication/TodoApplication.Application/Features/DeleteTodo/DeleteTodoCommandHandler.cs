using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using TodoApplication.Core.Repositories;

namespace TodoApplication.Application.Features.DeleteTodo
{
    public class DeleteTodoCommandHandler : IRequestHandler<DeleteTodoCommand, bool>
    {
        private readonly ITodoRepository _repository;
        public DeleteTodoCommandHandler(ITodoRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteTodoCommand request, CancellationToken cancellationToken)
        {
            return await _repository.DeleteTodoById(request.id);
        }
    }
}
