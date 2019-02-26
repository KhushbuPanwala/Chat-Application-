using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlackChat_API.Model
{
    public class SlackChatContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<MessageDetail> MessageDetails { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string ConnectionString = @"Server=(localdb)\ProjectsV13;Database=SlackChatDB;Trusted_Connection=True;";
            optionsBuilder.UseSqlServer(ConnectionString);

        }
    }
}
