using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApplication.Core.Entities
{
    public class TodoEntity
    {
        public int Id { get; set; }
        public string? TodoName { get; set; }
        public bool? IsCompleted { get; set; }
    }
}
