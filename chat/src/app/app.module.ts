import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoginComponent } from "./login/login.component";
import { GroupComponent } from "./group/group.component";
import { ChannelComponent } from "./channel/channel.component";
import { UsersComponent } from "./users/users.component";

@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    GroupComponent,
    ChannelComponent,
    UsersComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
