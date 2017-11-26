import {Injectable, Inject} from "@angular/core";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { NotificationsService, Notification } from 'angular2-notifications';

@Injectable()
export class NotificationService {

  options = {
    timeOut: 3000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: true
  };

  constructor(private nService: NotificationsService){
   
  
    
        
  }

  success(titulo, corpo):Notification
  {
      return this.nService.success( titulo, corpo, this.options);
  }

  error(error: Error):Notification
  {
      return this.nService.error( error.name, error.message, this.options);
  }

  errorMsg(titulo, corpo):Notification
  {
      return this.nService.error( titulo, corpo, this.options);
  }
}