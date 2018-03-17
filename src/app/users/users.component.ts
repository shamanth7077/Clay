import { Component } from '@angular/core';
import {DataTableModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import { SharedService } from 'service/shared/event.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class Users {

    public usersList: User[] = [];
    public doorsList: Door[] = []
    public selectedDoors: Door[] = [];
    public addUserEnabled: boolean = false;
    public addDoorEnabled: boolean = false;
    public newUser: string;
    public newDoor: string;
    
    constructor(public sharedservice: SharedService) {
        let usersDataList: User[] = JSON.parse(localStorage.getItem('userlist')) || [];
        this.usersList = usersDataList;
        let doorsDataList: Door[] = JSON.parse(localStorage.getItem('doorlist')) || [];
        this.doorsList = doorsDataList;

        if(usersDataList.length > 0){
            usersDataList.forEach(user => {
                    this.selectedDoors[user.id] = user.door;
            })
        }
    }

    public updateUserAccess(id: any, name: string) {
        
        let usersDataList: User[] = JSON.parse(localStorage.getItem('userlist')) || [];
        //if(usersDataList.length > 0){
            console.log('id: '+ id + ', name : ' + name)
            console.log(this.selectedDoors[id])
            let itemIndex = usersDataList.findIndex(user => user.id == id);
            console.log(itemIndex)
            console.log(this.selectedDoors[id])
            usersDataList[itemIndex].door = this.selectedDoors[id];
            console.log(usersDataList[itemIndex])          
            localStorage.setItem('userlist', JSON.stringify(usersDataList));            
        //}
        this.sharedservice.onNewToasterAlert.emit({severity:'success', summary:'Access updated for ' + name + ', User ID: ' + id, detail: ''});  
    }

    public toggleNewUserField(){
        this.addUserEnabled= !this.addUserEnabled;
    }
    public toggleNewDoorField(){
        this.addDoorEnabled= !this.addDoorEnabled;
    }

    public addNewUser(){
            let usersCount = localStorage.getItem('usercount') || '0';
            let usersDataList: User[] = JSON.parse(localStorage.getItem('userlist')) || [];
            if(this.newUser != '' && this.newUser != null){
                usersDataList.push(new UserData(Number(usersCount) + 1, this.newUser));
                this.usersList = usersDataList;
                localStorage.setItem('usercount', (Number(usersCount) + 1).toString());
                localStorage.setItem('userlist', JSON.stringify(this.usersList));
                this.newUser = '';
                this.addUserEnabled = false;
                this.sharedservice.onNewUserAddition.emit();
            }
            else{
                this.sharedservice.onNewToasterAlert.emit({severity:'error', summary:'User Name cannot be empty', detail: ''});  
            }
            
    }

    public addNewDoor(){
        let doorsCount = localStorage.getItem('doorsCount') || '0';
            let doorsDataList: Door[] = JSON.parse(localStorage.getItem('doorlist')) || [];
            if(this.newDoor != '' && this.newDoor != null){
                doorsDataList.push(new DoorData(Number(doorsCount) + 1, this.newDoor));
                this.doorsList = doorsDataList;
                localStorage.setItem('doorsCount', (Number(doorsCount) + 1).toString());
                localStorage.setItem('doorlist', JSON.stringify(this.doorsList));
                this.newDoor = '';
                this.addDoorEnabled = false;
            }
            else{
                this.sharedservice.onNewToasterAlert.emit({severity:'error', summary:'Door Name cannot be empty', detail: ''});  
            }
    }
}
export interface User {
    id;
    name;    
    door;
}

export interface Door {
    id: number,
    name: string    
}

export class UserData{
    id: number;
    name: string;
    door: any = [];

    constructor(id:number, name: string){
        this.id = id;
        this.name = name;
    }
}

export class DoorData{
    id: number;
    name: string;

    constructor(id:number, name: string){
        this.id = id;
        this.name = name;
    }
}