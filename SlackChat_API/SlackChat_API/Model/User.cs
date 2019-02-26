using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SlackChat_API.Model
{
    public class User
    {
        [Key]
        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(50)]
        [Display(Name = "Name")]
        public string UserName { get; set; }

        [Required]
        [StringLength(50)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required]
        [Display(Name = "Birthdate")]
        public DateTime Birthdate { get; set; }

        [Required]
        [Display(Name = "Status")]        
        public UserStatusEnum UserStatus { get; set; }

        public User()
        {
            this.UserStatus = UserStatusEnum.InActive;
        }
        public ICollection<MessageDetail> MessageDetail { get; set; }
        
    }
}
