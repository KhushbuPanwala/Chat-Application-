using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SlackChat_API.Model
{
    public class MessageDetail
    {
        [Key]
        public int MsgId { get; set; }

        [ForeignKey("User")]
        //Semder UserId
        public int UserId { get; set; }
        public User User { get; set; }
        //Receiver User Id 
        public int RUserId { get; set; }

        [Required]
        public string Message { get; set; }

        public DateTime Date { get; set; }
        //DEFAULT GETDATE(),

        public MessageStatusEnum MsgStatus { get; set; }
        //int default(0),

        public MessageDetail()
        {
            this.MsgStatus = MessageStatusEnum.Unread;
            this.Date = System.DateTime.Now;
        }

    }
}


