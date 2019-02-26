Aim: 
You need to create chat application which works like smaller version of slack using below technologies
•    ASP.NET CORE MVC  -API
•    ENTITY FRAMEWORK CORE -Database
•    ASP.NET CORE SIGNALR -Message Send/ Receive
•    ANGULAR 6  -UI, Calling API for DB data

Functionalities:
1. User should be able to login by his name  -> UserTbl 
2. After login he can see all users list in left panel  -> GetAllUser from UserTbl
3. There must be green indicator besides each user name in list to show whether
	he is online or not -> When user login set Status flag 
4. User can select any user from list to initiate chat -> click open right panel
5. On right panel there will be two sections ->
6. Upper section will show chat history with proper sorting by date time ->
7. Lower section will have text area and send button for sending a message to selected user ->
8. Message will be sent to selected user in real time ->
Bonus Point: Show unread message count beside every user in user list to 
	indicate unread messages from that user ->