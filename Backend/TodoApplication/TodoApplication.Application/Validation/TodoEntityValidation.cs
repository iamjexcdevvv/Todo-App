using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using TodoApplication.Core.Entities;

namespace TodoApplication.Application.Validation
{
    public class TodoEntityValidation : AbstractValidator<TodoEntity>
    {
        public TodoEntityValidation()
        {
            RuleFor(x => x.TodoName).NotEmpty();
        }
    }
}
