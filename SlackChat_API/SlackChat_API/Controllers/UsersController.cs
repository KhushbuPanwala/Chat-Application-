using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SlackChat_API.Hubs;
using SlackChat_API.Model;

namespace SlackChat_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private SlackChatContext _context = new SlackChatContext();

        private IHubContext<SlackChatHub> _hub;

        public UsersController(IHubContext<SlackChatHub> hub)
        {
            _hub = hub;
        }

        // GET: api/Users
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transferuserdata",
            _context.Users));
            return _context.Users;
            //return Ok(new { Message = "Request Completed" });
        }


        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //var user = await _context.Users.FindAsync(id);

            List<User> users = _context.Users.ToList();
            User user = users.SingleOrDefault(u => u.UserName.ToLower() == id.ToLower());

            //update status of user
            user = UpdateUser(user);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        public User UpdateUser(User user)
        {
            user.UserStatus = UserStatusEnum.Active;
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
            user = _context.Users.Find(user.UserId);
            return user;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        //public async Task<IActionResult> PutUser([FromRoute] int id, [FromBody] User user)
        public async Task<IActionResult> PutUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            User user = _context.Users.Find(id);
            user.UserStatus = UserStatusEnum.InActive;
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}