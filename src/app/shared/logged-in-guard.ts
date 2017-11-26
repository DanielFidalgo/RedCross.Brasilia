
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "app/shared/auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LoggedInGuard implements CanActivate {
    completo: Observable<boolean>;
    constructor(private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        this.authService.currentCadastro().subscribe(cadastro=>{
            if(cadastro !=null){
                this.completo = Observable.of(cadastro.completo);
            }else{
                this.completo = Observable.of(false);
            }
           
        });
        return this.authService.isLoggedIn() && this.completo;
    }
}
