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

  adduser(user): void {
    this.socket.emit("adduser", user);
  }

  addgroup(username, groupname) {
    this.socket.emit("addgroup", username, groupname);
  }

  delete(username) {
    this.socket.emit("deleteuser", username);
  }
}
