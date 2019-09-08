import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

const SERVER_URL = "http://localhost:3000/login";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private socket;

  constructor() {}

  initSocket(): void {
    this.socket = io(SERVER_URL);
  }
}
