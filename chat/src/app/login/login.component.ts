import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string = "";
  user = [];

  constructor(private loginservice: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginservice.initSocket();
  }

  login() {
    var a = 0;
    for (let i = 0; i < this.user.length; i++) {
      if (this.username == this.user[i].name) {
        alert("successful");
        localStorage.setItem("username", this.username);
        this.router.navigate(["/group"]);
        a = 1;
        break;
      }
    }
    if (a == 0) {
      alert("Try again");
    }
  }
}
