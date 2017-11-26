import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import {UserInfo} from "app/shared/user-info";
import {Observable} from "rxjs";
import { Cadastro } from "app/shared/Cadastro";
import {Router} from "@angular/router";

@Component({
    selector: 'app-display-user',
    templateUrl: './display-user.component.html',
    styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent {
    @Output() onLoggedOut = new EventEmitter();


    constructor(private authService: AuthService, private router: Router) {}

    currentUser(): Observable<UserInfo> {
        return this.authService.currentUser();
    }

    currentCadastro(): Observable<Cadastro>{
        return this.authService.currentCadastro();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
