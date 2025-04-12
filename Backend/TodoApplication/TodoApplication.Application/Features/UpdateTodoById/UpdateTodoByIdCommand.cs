using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using TodoApplication.Core.Entities;

namespace TodoApplication.Application.Features.UpdateTodoById
{
    public record UpdateTodoByIdCommand(int? id, TodoEntity updatedObj) : IRequest<bool>;
}
