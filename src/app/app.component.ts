import {Component} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";
import {UserInfo} from "app/shared/user-info";
import {MenubarModule,MenuItem} from 'primeng/primeng';
import {Cadastro} from "app/shared/cadastro";


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
    completo: Observable<UserInfo>;
    user: string;
    admin: boolean;
    constructor(private authService: AuthService, private router: Router) {
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
        
        
    }

    currentUser(): Observable<UserInfo> {
        return this.authService.currentUser();
    }

    currentCadastro(): Observable<Cadastro> {
        return this.authService.currentCadastro();
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
