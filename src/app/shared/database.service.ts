import {Injectable, Inject} from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import {UserInfo} from "./user-info";
import {Cadastro} from "./cadastro";
import {AuthService} from "./auth.service";
import { Observable, Subject, BehaviorSubject } from "rxjs";

@Injectable()
export class DatabaseService {
     user : Observable<UserInfo>;
    constructor(private authService: AuthService, private agularFireDatabase: AngularFireDatabase) {
        this.authService.currentUser();
       
    }


    newRegistry(userInfo: UserInfo){
        if(userInfo.uid!=null){
            //var usuario  = {nome: userInfo.data.nome.toUpperCase(), email: userInfo.data.email, cpf: userInfo.data.cpf, rg: userInfo.data.rg, celular: userInfo.data.celular, admin: false };
            let ref = this.agularFireDatabase.object("users/"+userInfo.uid);
            ref.set(userInfo.data);
        }
    }


}