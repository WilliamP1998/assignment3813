import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

const SERVER_URL = "http://localhost:3000/users";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private socket;

  constructor() {}

  initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  changeRole(user, role) {
    this.socket.emit("changeRole", user, role);
    console.log(user, role);
  }
}
