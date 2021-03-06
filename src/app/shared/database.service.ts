import {Injectable, Inject} from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
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
    
    private itemDoc: AngularFirestoreDocument<Cadastro>;
    item: Observable<Cadastro>;
    
    constructor(private authService: AuthService, private agularFireDatabase: AngularFirestore, private notification: NotificationService,) {
        this.authService.currentUser();
       
    }


    newRegistry(collection:string, data: any){
        this.authService.currentUser().subscribe((userInfo)=>{ 
            if(userInfo.uid!=null){
                //var usuario  = {nome: userInfo.data.nome.toUpperCase(), email: userInfo.data.email, cpf: userInfo.data.cpf, rg: userInfo.data.rg, celular: userInfo.data.celular, admin: false };
                let ref = this.agularFireDatabase.doc(collection+"/"+userInfo.uid);
                ref.set({...data}).then(()=>{
                    
                    console.log("SUCESSO"); 
                    
                },(error)=>{
                    console.log("ERRO");
                });
            }
        }
       );
        
    }

    objectBy<T>(entidade: string, uid: string):Observable<T>{
         
        let retorno = this.agularFireDatabase.doc<T>(entidade+"/"+uid).valueChanges();
        return retorno;
    }


}