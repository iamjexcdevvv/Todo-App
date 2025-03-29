using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using TodoApplication.Core.Entities;

namespace TodoApplication.Application.Features.GetTodos
{
    public record GetTodosQuery() : IRequest<List<TodoEntity>>;
}
