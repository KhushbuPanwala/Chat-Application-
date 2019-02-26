using Microsoft.AspNetCore.SignalR;
using SlackChat_API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlackChat_API.Hubs
{
    public class SlackChatHub : Hub
    {
        public async Task BroadCastUserData(List<User> data) => await Clients.All.SendAsync("broadcastuserdata", data);

        public async Task BroadCastEessageData(List<MessageDetail> data) => await Clients.All.SendAsync("broadcastmessagedata", data);
    }
}
