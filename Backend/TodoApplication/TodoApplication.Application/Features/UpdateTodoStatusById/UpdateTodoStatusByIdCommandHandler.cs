using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using TodoApplication.Core.Repositories;

namespace TodoApplication.Application.Features.UpdateTodoStatusById
{
    public class UpdateTodoStatusByIdCommandHandler : IRequestHandler<UpdateTodoStatusByIdCommand, bool>
    {
        private readonly ITodoRepository _repository;
        public UpdateTodoStatusByIdCommandHandler(ITodoRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(UpdateTodoStatusByIdCommand request, CancellationToken cancellationToken)
        {
            return await _repository.UpdateTodoStatusById(request.id, request.isCompleted);
        }
    }
}
