Assignment 1
Documentation

1. Git repository

Git repository is where I upload all my codes. At each stage I will comment out what I did, commit it and push it on GitHub. By doing so, if I did something wrong which make the program stop running, I can easily move back to the previous stage and try other ways to code.

2. Data structures:

The main entities which is used in both server and client side:

a. Users:

- Name: String
- Email: String
- Group List: Array
- Admin Group List: Array
- Role: String

b. Groups:

- Name: String
- Members: Array
- Channels: Array
- Assist: Array

c. Channels:

- Name: String
- Group: String
- Members: Array
- History: String

3.  Angular Architecture

a. Components:

1. Log in: This component is for the login page with user’s login form
2. Users: This component is the user tab where Super Admin can change the role of other users and all users can view other users and their roles
3. Groups: This component is the group tab where all users can view the information about the groups and functionality for each user role. Such as Super Admin can add, delete user, group and channel, while group admin can add, delete group and channel, etc.…
4. Channel: add user, add group and delete user

b. Services:

1. Log in: Get the information of users
2. Users: Change the role of the user
3. Groups: Get information about groups and channels as well as functionality for adding, removing them
4. User Add: add user, add group and delete user

c. Models:

1. Users
2. Groups
3. Channels

d. Routes:

- Path: “login”, component: LoginComponent
- Path: “group”, component: GroupComponent
- Path: “channel”, component: ChannelComponent
- Path: “users”, component: UserComponent

4. Node Server Architecture:

a. Modules:

- Cors
- Http
- Express
- Socket.io

b. Functions:

- Socket.connect()
- Server.listen()

c. Files:

- Server.js: main server
- Socket.js: responses of the server to services from client side
- Listen.js: listen to host and port
- Users.json: file contains data of users
- Groups.json: file contains data of groups
- Channel.json: file contain data of channels

d. Global variables:

- PORT

5. Responsibility:

- Server: server is responsible for storing and processing data. It can send data to the client side as well as receiving orders from the client side to modify the data from the server
- Client: client is responsible for displaying data as well as providing input and buttons for users to use to send order to the server side to modify the data

6. Server architecture:

a. Routes:

- http://localhost:3000/login
- http://localhost:3000/useradd
- http://localhost:3000/users
- http://localhost:3000/group

b. Socket:

- Socket.on(“login”)

1. No parameter
2. Return: list of existing users
3. Values: userlist
4. Purpose: Get the current users and return it

- Socket.on(“adduser”,user)

1. Parameter: user
2. Return: Alert on updated data or error
3. Values: None
4. Purpose: add new user to current user list

- Socket.on(“addgroup”,(username, groupname))

1. Parameter: username, groupname
2. Return: Alert on updated data or error
3. Values: userlist, grouplist, admingrouplist
4. Purpose: add new group to current group list

- Socket.on(“deleteuser”,username)

1. Parameter: username
2. Return: Alert on updated data or error
3. Values: userlist, grouplist
4. Purpose: delete selected user from current user list, group’s member list, channel’s user list

- Socket.on(“changerole”, (user, role)):

1. Parameter: user, role
2. Return: Alert on updated data or error
3. Values: userlist
4. Purpose: changerole of the selected user

- Socket.on(“getgroup”):

1. Parameter: no parameter
2. Return: current group list
3. Values: grouplist
4. Purpose: return the current group list

- Socket.on(“addgroup”, group):

1. Parameter: group
2. Return: Alert on updated data or error
3. Values: grouplist
4. Purpose: add group to current group list

- Socket.on(“removegroup”, (groupname, username)):

1. Parameter: groupname, username
2. Return: Alert on updated data or error
3. Values: grouplist, userlist
4. Purpose: Remove selected group from the data list

- Socket.on(“addmember”, (groupname, username)):

1. Parameter: groupname, username
2. Return: Alert on updated data or error
3. Values: grouplist
4. Purpose: Add member to selected group

- Socket.on(“deletemember”, (groupname, username)):

1. Parameter: groupname, username
2. Return: Alert on updated data or error
3. Values: grouplist, userlist
4. Purpose: Remove selected group from the data list

- Socket.on(“addchannel”, channel):

1. Parameter: channel
2. Return: Alert on updated data or error
3. Values: grouplist, channellist
4. Purpose: Add channel to selected group

- Socket.on(“removechannel”, (channelname, groupname)):

1. Parameter: channelname, groupname
2. Return: Alert on updated data or error
3. Values: grouplist, channellist
4. Purpose: Remove channel to selected group

7) Interaction

The server side will provide the data so the client can display it. Each of the component will receive data from the server through ngoninit. Each time the user interact with the client side and send request for changing data to the server side, it will request through emit to server socket. After receiving the request, the server will get the data, modify it and send it back to the client side. As soon as the client received the modified data, it will reload the page and display the new data. For example, if Super Admin want to delete user, when he/she finish choosing the user and press the delete button, the data of that user will be passed to the server side. The server side will then track that user in the database, delete it and update the new user list. The user tab will be updated and show the new user list.
