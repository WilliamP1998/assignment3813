import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { nextTick } from "q";

const SERVER_URL = "http://localhost:3000/group";

@Injectable({
  providedIn: "root"
})
export class GroupService {
  private socket;

  constructor() {}

  initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  getgroup(): void {
    this.socket.emit("getgroup");
  }

  //get list of groups
  getgrouped(next) {
    this.socket.on("getgroup", res => next(res));
  }

  getchannel() {
    this.socket.emit("getchannel");
  }

  //get list of channels
  getchanneled(next) {
    this.socket.on("getchannel", res => next(res));
  }

  //add group to current group list
  addgroup(group) {
    this.socket.emit("addgroup", group);
  }

  //remove group from current group list
  removegroup(groupname, username) {
    this.socket.emit("removegroup", groupname, username);
  }

  //add channel from selected group
  addchannel(channel) {
    this.socket.emit("addchannel", channel);
  }

  //remove channel from selected group
  removechannel(channelname, groupname) {
    this.socket.emit("removechannel", channelname, groupname);
  }

  //add member to group
  addmember(groupname, username) {
    this.socket.emit("addmember", groupname, username);
  }

  //delete member from the group
  deletemember(groupname, username) {
    this.socket.emit("deletemember", groupname, username);
  }
}
