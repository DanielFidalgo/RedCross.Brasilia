import {Injectable, Inject} from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import {UserInfo} from "./user-info";
import {AuthService} from "./auth.service";
import { Observable, Subject, BehaviorSubject } from "rxjs";

@Injectable()
export class DatabaseService {
     user : Observable<UserInfo>;
    constructor(private authService: AuthService, private agularFireDatabase: AngularFireDatabase) {
        this.authService.currentUser();
       
    }


    newRegistry(userInfo: UserInfo){

        
        this.agularFireDatabase.list("users").push({uid: userInfo.uid!=null?userInfo.uid:"fail", cadastro: userInfo.data!=null?"tem um objeto estranho":"fail"})
    }


}