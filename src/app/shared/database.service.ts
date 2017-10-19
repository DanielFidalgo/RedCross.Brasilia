import {Injectable, Inject} from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import {UserInfo} from "./user-info";
import {Cadastro} from "./cadastro";
import {AuthService} from "./auth.service";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { NotificationService } from "app/shared/notification.service";



@Injectable()
export class DatabaseService {
    static UNKNOWN_USER = {
        isAnonymous: true,
        email: null,
        displayName: null,
        providerId: null,
        uid: null,
        data: null
    };

    
     
    constructor(private authService: AuthService, private agularFireDatabase: AngularFireDatabase, private notification: NotificationService,) {
        this.authService.currentUser();
       
    }


    newRegistry(cadastro: Cadastro){
        this.authService.currentUser().subscribe((userInfo)=>{
            if(userInfo.uid!=null){
            //var usuario  = {nome: userInfo.data.nome.toUpperCase(), email: userInfo.data.email, cpf: userInfo.data.cpf, rg: userInfo.data.rg, celular: userInfo.data.celular, admin: false };
            let ref = this.agularFireDatabase.object("users/"+userInfo.uid);
            ref.set(cadastro).then(()=>{
                
                console.log("SUCESSO");
                
            },(error)=>{
                console.log("ERRO");
            });
        }
           }
       );
        
    }

    objectBy<T>(entidade: string, uid: string):Observable<T>{
        let retorno = new Subject<T>();
        this.agularFireDatabase.object(entidade+"/"+uid).subscribe(data=>{console.log(data); retorno.next(data)});
        return retorno;
    }


}