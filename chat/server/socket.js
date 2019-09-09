var fs = require("fs");

module.exports = {
  connect: function(io) {
    const login = io.of("/login");

    //return users list
    login.on("connection", socket => {
      socket.on("login", () => {
        userlist = JSON.parse(fs.readFileSync("./users.json", "utf8"));
        login.emit("login", JSON.stringify(userlist));
      });
    });

    const useradd = io.of("/useradd");

    useradd.on("connection", socket => {
      //add user
      socket.on("adduser", user => {
        fs.writeFileSync("./users.json", user, function(err) {
          if (err) throw err;
          console.log("updated");
        });
      });

      //add group
      socket.on("addgroup", (username, groupname) => {
        var list = fs.readFileSync("./users.json", "utf8");
        let userlist = JSON.parse(list);
        for (let i = 0; i < userlist.length; i++) {
          if (username == userlist[i].name) {
            userlist[i].grouplist.push(groupname);
            userlist[i].admingrouplist.push(groupname);
          }
        }
        fs.writeFileSync("./users.json", JSON.stringify(userlist), function(
          err
        ) {
          if (err) throw err;
          console.log("updated");
        });
      });

      //delete user from the database
      socket.on("deleteuser", username => {
        var list = fs.readFileSync("./users.json", "utf8");
        let userlist = JSON.parse(list);
        for (let i = 0; i < userlist.length; i++) {
          if (username == userlist[i].name) {
            userlist.splice(i, 1);
          }
        }
        fs.writeFileSync("./users.json", JSON.stringify(userlist), function(
          err
        ) {
          if (err) throw err;
          console.log("updated");
        });

        grouplist = JSON.parse(fs.readFileSync("./group.json", "utf8"));
        for (let i = 0; i < grouplist.length; i++) {
          for (let j = 0; j < grouplist[i].members.length; j++) {
            if (username == grouplist[i].members[j]) {
              grouplist[i].members.splice(j, 1);
            }
          }
        }
        fs.writeFileSync("./group.json", JSON.stringify(grouplist), function(
          err
        ) {
          if (err) throw err;
          console.log("updated");
        });

        channellist = JSON.parse(fs.readFileSync("./channel.json", "utf8"));
        for (let i = 0; i < channellist.length; i++) {
          for (let j = 0; j < channellist[i].members.length; j++) {
            if (username == channellist[i].members[j]) {
              channellist[i].members.splice(j, 1);
            }
          }
        }
        fs.writeFileSync(
          "./channel.json",
          JSON.stringify(channellist),
          function(err) {
            if (err) throw err;
            console.log("updated");
          }
        );
      });
    });

    const users = io.of("/users");

    users.on("connection", socket => {
      //change role of the user

      //change role of the user
      socket.on("changeRole", (user, role) => {
        var list = fs.readFileSync("./users.json", "utf8");
        let userlist = JSON.parse(list);

        for (let i = 0; i < userlist.length; i++) {
          if (user.toString() === userlist[i].name.toString()) {
            userlist[i].role = role;

            fs.writeFileSync("./users.json", JSON.stringify(userlist), function(
              err
            ) {
              if (err) throw err;
              console.log("updated");
            });
          }
        }
      });
    });

    const groups = io.of("/group");

    groups.on("connection", socket => {
      //get group from grouplist
      socket.on("getgroup", () => {
        grouplist = JSON.parse(fs.readFileSync("./group.json", "utf8"));
        groups.emit("getgroup", JSON.stringify(grouplist));
      });

      // add group to grouplist
      socket.on("addgroup", group => {
        grouplist = JSON.parse(fs.readFileSync("./group.json", "utf8"));
        grouplist.push(JSON.parse(group));

        fs.writeFileSync("./group.json", JSON.stringify(grouplist), function(
          err
        ) {
          if (err) throw err;
          console.log("updated");
        });
      });

      //remove group from the group
      socket.on("removegroup", (groupname, username) => {
        grouplist = JSON.parse(fs.readFileSync("./group.json", "utf8"));
        for (let i = 0; i < grouplist.length; i++) {
          if (groupname == grouplist[i].name) {
            grouplist.splice(i, 1);
          }
        }
        fs.writeFileSync("./group.json", JSON.stringify(grouplist), function(
          err
        ) {
          if (err) throw err;
          console.log("updated");
        });

        //remove the group from group property of user
        var list = fs.readFileSync("./users.json", "utf8");
        let userlist = JSON.parse(list);
        for (let i = 0; i < userlist.length; i++) {
          if (username == userlist[i].name) {
            for (let j = 0; j < userlist[i].grouplist.length; j++) {
              if (groupname == userlist[i].grouplist[j]) {
                userlist[i].grouplist.splice(j, 1);
              }
            }
          }
        }
        fs.writeFileSync("./users.json", JSON.stringify(userlist), function(
          err
        ) {
          if (err) throw err;
          console.log("updated");
        });
      });

      //add member to the group
      socket.on("addmember", (groupname, username) => {
        grouplist = JSON.parse(fs.readFileSync("./group.json", "utf8"));

        for (let i = 0; i < grouplist.length; i++) {
          if (groupname == grouplist[i].name) {
            grouplist[i].members.push(username);
          }
        }
        fs.writeFileSync("./group.json", JSON.stringify(grouplist), function(
          err
        ) {
          if (err) throw err;
          console.log("updated");
        });
      });

      //delete member from the group
      socket.on("deletemember", (groupname, username) => {
        grouplist = JSON.parse(fs.readFileSync("./group.json", "utf8"));
        for (let i = 0; i < grouplist.length; i++) {
          if (groupname == grouplist[i].name) {
            for (let j = 0; j < grouplist[i].members.length; j++) {
              if (username == grouplist[i].members[j]) {
                grouplist[i].members.splice(j, 1);
              }
            }
            if (grouplist[i].members.length == 0) {
              grouplist.splice(i, 1);
              var list = fs.readFileSync("./users.json", "utf8");
              let userlist = JSON.parse(list);
              for (let i = 0; i < userlist.length; i++) {
                if (username == userlist[i].name) {
                  for (let j = 0; j < userlist[i].grouplist.length; j++) {
                    if (groupname == userlist[i].grouplist[j]) {
                      userlist[i].grouplist.splice(j, 1);
                    }
                  }
                }
              }
              fs.writeFileSync(
                "./users.json",
                JSON.stringify(userlist),
                function(err) {
                  if (err) throw err;
                  console.log("updated");
                }
              );
            }
          }
        }

        fs.writeFileSync("./group.json", JSON.stringify(grouplist), function(
          err
        ) {
          if (err) throw err;
          console.log("updated");
        });
      });

      //get channel list
      socket.on("getchannel", () => {
        channellist = JSON.parse(fs.readFileSync("./channel.json", "utf8"));
        groups.emit("getchannel", JSON.stringify(channellist));
      });

      //add channel to selected group
      socket.on("addchannel", channel => {
        channellist = JSON.parse(fs.readFileSync("./channel.json", "utf8"));
        channellist.push(channel);
        fs.writeFileSync(
          "./channel.json",
          JSON.stringify(channellist),
          function(err) {
            if (err) throw err;
            console.log("updated");
          }
        );
        grouplist = JSON.parse(fs.readFileSync("./group.json", "utf8"));
        for (let i = 0; i < grouplist.length; i++) {
          if (channel.group == grouplist[i].name) {
            grouplist[i].channels.push(channel.name);
          }
        }
        fs.writeFileSync("./group.json", JSON.stringify(grouplist), function(
          err
        ) {
          if (err) throw err;
          console.log("updated");
        });
      });

      //remove channel from selected group
      socket.on("removechannel", (channelname, groupname) => {
        channellist = JSON.parse(fs.readFileSync("./channel.json", "utf8"));
        for (let i = 0; i < channellist.length; i++) {
          if (channelname == channellist[i].name) {
            channellist.splice(i, 1);
          }
        }
        fs.writeFileSync(
          "./channel.json",
          JSON.stringify(channellist),
          function(err) {
            if (err) throw err;
            console.log("updated");
          }
        );

        grouplist = JSON.parse(fs.readFileSync("./group.json", "utf8"));
        for (let i = 0; i < grouplist.length; i++) {
          if (groupname == grouplist[i].name) {
            for (let j = 0; j < grouplist[i].channels.length; j++) {
              if (channelname == grouplist[i].channels[j]) {
                grouplist[i].channels.splice(j, 1);
              }
            }
          }
        }

        fs.writeFileSync("./group.json", JSON.stringify(grouplist), function(
          err
        ) {
          if (err) throw err;
          console.log("updated");
        });
      });
    });
  }
};
