import { Component } from '@angular/core';
import { TooltipModule, SelectItem } from 'primeng/primeng';
import {GrowlModule, Message} from 'primeng/primeng';
import { SharedService } from 'service/shared/event.service';
import {DropdownModule} from 'primeng/primeng';
import {Router} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {  
    
    public userName: string;
    public userRole: string;
    public userPic: string;
    public toasterAlertSubscription : any;
    public newUserSubscription: any;
    public messages: Message[] = [];
    public researchSite:string;
    public usersList: SelectItem[];
    public selectedUser: User;
    
    constructor(public sharedservice: SharedService, private router: Router){
        
        this.populateUsers();

        
        if(localStorage.getItem('currentuser') == null || localStorage.getItem('currentuser') == ''){
            localStorage.setItem('currentuser', JSON.stringify({id: 0, name: 'admin', door: []}));
            this.selectedUser = {id: 0, name: 'admin', door: []};
        }
        else{
            this.selectedUser = JSON.parse(localStorage.getItem('currentuser'));
            if(this.selectedUser.name != 'admin'){
                this.router.navigate(['/doors']);
            }
        }

        this.toasterAlertSubscription = sharedservice.onNewToasterAlert.subscribe(
            (message) => {                  
                  this.messages.push(message);                 
        });

        this.newUserSubscription = sharedservice.onNewUserAddition.subscribe(
            (user) => {                                  
                this.populateUsers();
        });
          
    }

    public populateUsers(){
        let usersDataList: User[] = JSON.parse(localStorage.getItem('userlist')) || []; 
                let newUserList : SelectItem[] = [];
                newUserList.push({label:'Admin', value:{id: 0, name: 'admin', door: []}});
                usersDataList.forEach(user => {
                    newUserList.push({label: user.name, value:{id: user.id, name: user.name}});
                })
        this.usersList = newUserList;
    }

    public updateCurrentUser(selectedUser){
        let currentUser = selectedUser;
        localStorage.setItem('currentuser', JSON.stringify(currentUser));
        this.sharedservice.onNewToasterAlert.emit({severity:'success', summary: 'User changed to : ' + selectedUser.name, detail: ''});  
        this.selectedUser  = selectedUser;
        if(this.selectedUser.name != 'admin'){
            this.router.navigate(['/doors']);
        }
    }

}

export interface User {
    id;
    name;    
    door;
}