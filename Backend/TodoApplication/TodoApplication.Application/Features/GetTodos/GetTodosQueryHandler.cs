using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using TodoApplication.Core.Entities;
using TodoApplication.Core.Repositories;

namespace TodoApplication.Application.Features.GetTodos
{
    public class GetTodosQueryHandler : IRequestHandler<GetTodosQuery, List<TodoEntity>>
    {
        private readonly ITodoRepository _repository;
        public GetTodosQueryHandler(ITodoRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<TodoEntity>> Handle(GetTodosQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetTodos();
        }
    }
}
