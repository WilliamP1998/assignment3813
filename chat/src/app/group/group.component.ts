import { Component, OnInit } from "@angular/core";
import { UseraddService } from "../useradd.service";
import { GroupService } from "../group.service";
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
  role;
  currentChannel = "";
  normalUser = false;
  superAdmin = false;
  groupAdmin = false;
  groupAssist = false;
  isassis = false;
  grouplist = [];
  admingrouplist = [];
  groups = [];
  showngroups = [];
  groupname = "";
  username = "";
  usernamelist = [];
  channels = [];
  channelname = "";
  deleteusername = "";
  assislist = [];
  assisname = "";
  users = [];
  aname = "";
  dname = "";

  constructor(
    private addservice: UseraddService,
    private groupservice: GroupService,
    private loginservice: LoginService
  ) {}

  ngOnInit() {
    let username = localStorage.getItem("username");
    this.username = username;
    this.loginservice.initSocket();
    this.addservice.initSocket();
    this.groupservice.initSocket();
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

    this.groupservice.initSocket();
    this.groupservice.getgroup();
    this.groupservice.getgrouped(res => {
      this.groups = JSON.parse(res);
      for (let i = 0; i < this.groups.length; i++) {
        for (let j = 0; j < this.groups[i].members.length; j++) {
          if (username == this.groups[i].members[j]) {
            this.showngroups.push(this.groups[i]);
          }
        }
      }
    });
    this.groupservice.getchannel();
    this.groupservice.getchanneled(res => {
      this.channels = JSON.parse(res);
    });

    //Show the group current user has joined

    this.username = username;
  }

  // add user
  adduser() {
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
    this.addservice.adduser(newupload);
    location.reload();
  }

  //create group
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
    this.addservice.addgroup(username, this.groupname);
    this.groupservice.addgroup(JSON.stringify(grouplist));
    alert("create successful");
    location.reload();
  }

  //remove group from current group list
  remove(groupname) {
    var username = localStorage.getItem("username");
    for (let i = 0; i < this.groups.length; i++) {
      if (groupname == this.groups[i].name) {
        this.groups.splice(i, 1);
      }
    }
    console.log(this.groups);
    this.groupservice.removegroup(groupname, username);
    location.reload();
  }

  //add channel from selected group
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
    this.groupservice.addchannel(channel);
    location.reload();
  }

  //remove channel from selected group
  removechannel(channelname, groupname) {
    this.groupservice.removechannel(this.currentChannel, groupname);
    location.reload();
  }

  //delete user
  deleteuser() {
    this.addservice.delete(this.deleteusername);
    location.reload();
  }

  //go to the selected channel
  go(channelname) {
    localStorage.setItem("channelname", JSON.stringify(channelname));
  }

  //add member to selected group
  addmember(groupname) {
    this.groupservice.addmember(groupname, this.aname);
    alert("successful");
    location.reload();
  }

  //delete member from the group
  deletemember(groupname) {
    this.groupservice.deletemember(groupname, this.dname);
    alert("successful");
    location.reload();
  }

  // add user to the group
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
