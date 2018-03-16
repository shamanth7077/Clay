import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Users } from 'app/users/users.component';
import { Doors } from 'app/doors/doors.component';
import { Events } from 'app/events/events.component';
import { HeaderComponent } from './header/header.component';
import {DataTableModule, MultiSelectModule, GrowlModule, ToggleButtonModule, DropdownModule} from 'primeng/primeng';
import { routing, childRouting } from './app.routing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedService } from 'service/shared/event.service';

@NgModule({
  declarations: [
    AppComponent, Users, Doors, Events, HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    routing,
    MultiSelectModule, GrowlModule, ToggleButtonModule, DropdownModule, BrowserAnimationsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
