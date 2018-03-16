import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SharedService {  
  onNewToasterAlert: EventEmitter<any> = new EventEmitter(); 
  onNewUserAddition: EventEmitter<any> = new EventEmitter(); 
}