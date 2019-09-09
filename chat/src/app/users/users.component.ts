import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";
import { UsersService } from "../users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  email = "";
  name = "";
  admin = "";
  role = "";
  currentRole = "";
  currentUser = "";
  superAdmin = false;
  groupAdmin = false;
  groupAssist = false;
  normalUser = false;
  username = "";
  usernamelist = [];
  assislist = [];
  users = [];

  constructor(
    private loginservice: LoginService,
    private userservice: UsersService
  ) {}

  ngOnInit() {
    let username = localStorage.getItem("username");
    this.username = username;
    this.userservice.initSocket();
    this.loginservice.initSocket();
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

          this.assislist.splice(i, 1);
        }
      }
    });

    this.username = username;
  }
  changeRole(user, role) {
    role = this.currentRole;
    user = this.currentUser;
    for (let i = 0; i < this.users.length; i++) {
      if (user == this.users[i].name) {
        this.users[i].role = role;
      }
    }
    this.userservice.changeRole(this.currentUser, this.currentRole);
    console.log(this.currentUser, this.currentRole);
    location.reload();
  }
}
