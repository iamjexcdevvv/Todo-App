using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace TodoApplication.Application.Features.CreateTodo
{
    public record CreateTodoCommand(string TodoName, bool IsCompleted) : IRequest<int>;
}
