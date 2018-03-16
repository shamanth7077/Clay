import { Component } from '@angular/core';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class Events {
    public eventList: Event[] = [];
    constructor() {
        let doorEvents: any = JSON.parse(localStorage.getItem('doorevents')) || [];
        this.eventList = doorEvents;
    }
}

export interface Event {
    id;
    user;
    type;  
    door;

}