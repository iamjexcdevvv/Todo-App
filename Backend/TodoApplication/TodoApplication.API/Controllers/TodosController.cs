using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApplication.Application.Features.CreateTodo;
using TodoApplication.Application.Features.DeleteTodo;
using TodoApplication.Application.Features.GetTodos;
using TodoApplication.Application.Features.UpdateTodoById;
using TodoApplication.Core.Entities;

namespace TodoApplication.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TodosController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<TodoEntity>> GetTodos()
        {
            var result = await _mediator.Send(new GetTodosQuery());

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> CreateTodo([FromBody] TodoEntity todoObj)
        {
            todoObj.Id = await _mediator.Send(new CreateTodoCommand(todoObj.TodoName, todoObj.IsCompleted));
            return CreatedAtAction(nameof(GetTodos), new { id = todoObj.Id }, todoObj);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateTodoById(int? id, TodoEntity updatedObj)
        {
            if (id == null)
            {
                return BadRequest();
            }

            bool result = await _mediator.Send(new UpdateTodoByIdCommand(id, updatedObj));

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoById(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            bool result = await _mediator.Send(new DeleteTodoCommand(id));

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
