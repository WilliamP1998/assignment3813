import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { nextTick } from "q";

const SERVER_URL = "http://localhost:3000/adduser";

@Injectable({
  providedIn: "root"
})
export class AdduserService {
  private socket;

  constructor() {}

  initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  add(user): void {
    this.socket.emit("add", user);
  }

  addgroup(username, groupname) {
    this.socket.emit("addgroup", username, groupname);
  }

  delete(username) {
    this.socket.emit("deleteuser", username);
  }
}
