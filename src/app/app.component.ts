import {Component} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";
import {UserInfo} from "app/shared/user-info";
import {MenubarModule,MenuItem} from 'primeng/primeng';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public  options = {
        position: ["top", "right"],
        timeOut: 3000,
        lastOnBottom: true
    };
    private alertType = null;
    private alertMessage = "";
    private items: MenuItem[];
    isLoggedIn = new BehaviorSubject<boolean>(false);
    completo: boolean;
    user: string;
    constructor(private authService: AuthService, private router: Router) {
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
        this.authService.currentCadastro().subscribe(cadastro =>{
            this.completo = cadastro.completo;
            this.user = cadastro.nome;
        });
    }

    currentUser(): Observable<UserInfo> {
        return this.authService.currentUser();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    onResetPasswordSuccess() {
        this.alertType = "Sucesso";
        this.alertMessage = "Reset Password Sent!";
    }

    onLoginSuccess() {
        this.alertType = "success";
        this.alertMessage = "Login Success!";
    }

    onRegisterSuccess() {
        this.alertType = "success";
        this.alertMessage = "User registered!";
    }

    onError(err) {
        this.alertType = "danger";
        this.alertMessage = err;
    }

    onLoggedOut() {
        // Just reset any displayed messsage.
        this.alertType = null;
        this.alertMessage = "";
    }

    alertClosed() {
        this.alertType = null;
        this.alertMessage = "";
    }
    ngOnInit() {
        this.currentUser().subscribe(userInfo=>{
            this.items = [{
                label:userInfo.displayName ,
                icon:'fa-caret-down',
                items: [
                    {label: 'Cadastro', icon: 'fa-plus', routerLink:['register']}
                ]
            }];
        });
        
    }
}
