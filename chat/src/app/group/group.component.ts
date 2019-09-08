import { Component, OnInit } from "@angular/core";

import { LoginService } from "../login.service";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
  email = "";
  name = "";
  admin = "";

  currentChannel = "";
  normalUser = false;
  superAdmin = false;
  groupAdmin = false;
  groupAssist = false;

  grouplist = [];
  admingrouplist = [];
  groups = [];

  groupname = "";
  username = "";
  usernamelist = [];

  channelname = "";

  assislist = [];

  users = [];

  constructor(private loginservice: LoginService) {}

  ngOnInit() {
    let username = localStorage.getItem("username");
    this.username = username;

    this.loginservice.login();
    this.loginservice.logined(res => {
      this.users = JSON.parse(res);
      for (let i = 0; i < this.users.length; i++) {
        this.usernamelist.push(this.users[i].name);
        if (username == this.users[i].name) {
          if (this.users[i].role == "Super Admin") {
            this.superAdmin = true;
          } else if (this.users[i].role == "Group Admin") {
            this.groupAdmin = true;
          } else if (this.users[i].role == "Group Assist") {
            this.groupAssist = true;
          } else if (this.users[i].role == "Normal User") {
            this.normalUser = true;
          }

          this.grouplist = this.users[i].grouplist;
          this.admingrouplist = this.users[i].admingrouplist;
          this.assislist.splice(i, 1);
        }
      }
    });

    //Show the group current user has joined

    this.username = username;
  }

  add() {
    if (this.admin == "Super Admin") {
      var newuser = {
        name: this.name,
        email: this.email,
        grouplist: [],
        admingrouplist: [],
        role: this.admin
      };
    } else if (this.admin == "Group Assist") {
      var newuser = {
        name: this.name,
        email: this.email,
        grouplist: [],
        admingrouplist: [],
        role: this.admin
      };
    } else if (this.admin == "Normal User") {
      var newuser = {
        name: this.name,
        email: this.email,
        grouplist: [],
        admingrouplist: [],
        role: this.admin
      };
    } else {
      var newuser = {
        name: this.name,
        email: this.email,
        grouplist: [],
        admingrouplist: [],
        role: this.admin
      };
    }
    this.users.push(newuser);
    let newupload = JSON.stringify(this.users);

    location.reload();
  }

  creategroup() {
    var username = localStorage.getItem("username");
    var empty = [];
    empty.push(username);
    var grouplist = {
      name: this.groupname,
      members: empty,
      channels: [],
      assis: []
    };
    this.groups.push(grouplist);
    console.log(this.groups);

    alert("create successful");
    location.reload();
  }

  remove(groupname) {
    var username = localStorage.getItem("username");
    for (let i = 0; i < this.groups.length; i++) {
      if (groupname == this.groups[i].name) {
        this.groups.splice(i, 1);
      }
    }
    console.log(this.groups);

    location.reload();
  }

  addchannel(groupname) {
    var username = localStorage.getItem("username");
    var empty = [];
    empty.push(username);
    var channel = {
      name: this.channelname,
      group: groupname,
      members: empty,
      history: ""
    };

    location.reload();
  }

  removechannel(channelname, groupname) {
    location.reload();
  }

  deleteuser() {
    location.reload();
  }

  go(channelname) {
    localStorage.setItem("channelname", JSON.stringify(channelname));
  }

  addassis(groupname) {
    alert("add successful");
    location.reload();
  }

  adduser(groupname) {
    alert("successful");
    location.reload();
  }

  deluser(groupname) {
    alert("successful");
    location.reload();
  }

  getaddgroupuser(groupmember) {
    var users = this.users;
    var addgroupuser = [];
    for (let i = 0; i < users.length; i++) {
      addgroupuser.push(users[i].name);
    }
    for (let i = 0; i < addgroupuser.length; i++) {
      for (let j = 0; j < groupmember.length; j++) {
        if (groupmember[j] == addgroupuser[i]) {
          addgroupuser.splice(i, 1);
        }
      }
    }
    return addgroupuser;
  }
}
