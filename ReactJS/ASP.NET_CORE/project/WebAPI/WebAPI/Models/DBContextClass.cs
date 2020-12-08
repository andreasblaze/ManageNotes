using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class DBContextClass:DbContext
    {
        public DBContextClass(DbContextOptions<DBContextClass> options):base(options)
        {

        }

        public DbSet<Notes> DNotes { get; set; }
    }
}
