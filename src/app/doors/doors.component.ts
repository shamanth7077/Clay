import { Component } from '@angular/core';
import {ToggleButtonModule} from 'primeng/primeng';
import { SharedService } from 'service/shared/event.service';

@Component({
  selector: 'doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.scss']
})
export class Doors {

    public doorsList: Door[] = [];
    checked1: boolean = false;
    doorStatus: any = [];

    constructor(public sharedservice: SharedService) {
        let doorsDataList: Door[] = JSON.parse(localStorage.getItem('doorlist')) || [];
        this.doorsList = doorsDataList;
    }

    handleDoorStatusChange(event, doorID, doorName) {
        event.originalEvent.stopPropagation();
        if(this.checkUserAuthorization(event, doorID, doorName)){
            this.doorStatus[doorID] = event.checked;
            let doorOpened = event.checked;
            let statusText = doorOpened ? 'Opened' : 'Closed';
            let currentUser = JSON.parse(localStorage.getItem('currentuser'));            
            this.sharedservice.onNewToasterAlert.emit({severity:'info', summary: doorName + ' has been ' + statusText, detail: ''});  
            let doorEvents: any = JSON.parse(localStorage.getItem('doorevents')) || [];
            doorEvents.push({id:doorEvents.length + 1 , user: currentUser.name , type: statusText, door: doorName})
            localStorage.setItem('doorevents', JSON.stringify(doorEvents));

        }
        else{
            setTimeout(() =>
             { 
                this.doorStatus[doorID] = false; 
             }, 0);
            
            let currentUser = JSON.parse(localStorage.getItem('currentuser'));    
            let doorEvents: any = JSON.parse(localStorage.getItem('doorevents')) || [];
            doorEvents.push({id:doorEvents.length + 1 , user: currentUser.name , type: 'Declined', door: doorName})
            localStorage.setItem('doorevents', JSON.stringify(doorEvents));
            this.sharedservice.onNewToasterAlert.emit({severity:'error', summary: ' You are not authorized to open this door ', detail: ''}); 
             
        }

        
    }


    public checkUserAuthorization(event, doorID, doorName){
        let usersDataList: User[] = JSON.parse(localStorage.getItem('userlist')) || [];
        let currentUser: any = JSON.parse(localStorage.getItem('currentuser'));  
        if(currentUser.id == 0){return true}     
        let itemIndex = usersDataList.findIndex(user => user.id == currentUser.id);
        let currentUserdoorAccess = usersDataList[itemIndex].door;
        let doorIndex = currentUserdoorAccess.findIndex(door => door.id == doorID);
        if(doorIndex < 0){return false } else {return true} ;
            
    }
}

export interface Door {
    id;
    name;    
}

export interface User {
    id;
    name;    
    door;
}