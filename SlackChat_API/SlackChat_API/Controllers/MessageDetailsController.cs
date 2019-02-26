using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
    public class MessageDetailsController : ControllerBase
    {
        private SlackChatContext _context = new SlackChatContext();
        private IHubContext<SlackChatHub> _hub;

        public MessageDetailsController(IHubContext<SlackChatHub> hub)
        {
            _hub = hub;
        }
        // GET: api/MessageDetails
        [HttpGet]
        public IActionResult GetMessageDetails()
        {
            var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transfermessagedata",
                _context.MessageDetails));

            return Ok(new { Message = "Request Completed" });
            //return _context.MessageDetails;
        }

        // GET: api/MessageDetails/5        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMessageDetail([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int cUserId = Convert.ToInt32(id.Split(';')[0]);
            int rUserId = Convert.ToInt32(id.Split(';')[1]);

            SlackChatContext slackChatContext = new SlackChatContext();            
            string connectionString = @"Server=(localdb)\ProjectsV13;Database=SlackChatDB;Trusted_Connection=True;";
            string query = "UPDATE MessageDetails SET MsgStatus=1 WHERE " +
                        "UserId=" + rUserId + " AND RUserId=" + cUserId+ "";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            command.CommandText = query;    
            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();
            return Ok(new { Message = "Record updated Successfully!!!" });
        }

        // PUT: api/MessageDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessageDetail([FromRoute] int id, [FromBody] MessageDetail messageDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != messageDetail.MsgId)
            {
                return BadRequest();
            }

            _context.Entry(messageDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MessageDetails
        [HttpPost]
        public async Task<IActionResult> PostMessageDetail([FromBody] MessageDetail messageDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.MessageDetails.Add(messageDetail);
            //await _context.SaveChangesAsync();
            _context.SaveChanges();
            return Ok();

            //return CreatedAtAction("GetMessageDetail", new { id = messageDetail.MsgId }, messageDetail);
        }

        // DELETE: api/MessageDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessageDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var messageDetail = await _context.MessageDetails.FindAsync(id);
            if (messageDetail == null)
            {
                return NotFound();
            }

            _context.MessageDetails.Remove(messageDetail);
            await _context.SaveChangesAsync();

            return Ok(messageDetail);
        }

        private bool MessageDetailExists(int id)
        {
            return _context.MessageDetails.Any(e => e.MsgId == id);
        }
    }
}