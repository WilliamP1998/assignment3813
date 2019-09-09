import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { nextTick } from "q";

const SERVER_URL = "http://localhost:3000/useradd";

@Injectable({
  providedIn: "root"
})
export class UseraddService {
  private socket;

  constructor() {}

  initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  //add user
  adduser(user): void {
    this.socket.emit("adduser", user);
  }

  //add group
  addgroup(username, groupname) {
    this.socket.emit("addgroup", username, groupname);
  }

  //delete user
  delete(username) {
    this.socket.emit("deleteuser", username);
  }
}
