import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {firebaseConfig} from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import {AuthService} from "app/shared/auth.service";
import {DatabaseService} from "app/shared/database.service";
import {LoginUserComponent} from "app/login-user/login-user.component";
import {DisplayUserComponent} from "app/display-user/display-user.component";
import {RegisterUserComponent} from "app/register-user/register-user.component";
import {AlertModule} from "ngx-bootstrap";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {Routes, RouterModule} from "@angular/router";
import {HomePageComponent} from "./pages/home-page.component";
import {RegisterPageComponent} from "./pages/register-page.component";
import {AllInOnePageComponent} from "./pages/all-in-one-page.component";
import {LoginPageComponent} from "./pages/login-page.component";
import { LoggedInGuard } from "app/shared/logged-in-guard";
import { DashboardPageComponent } from './pages/dashboard-page.component';
import {ToggleButtonModule} from 'primeng/primeng'; 
import {InputMaskModule} from 'primeng/primeng';
import {MenubarModule,MenuItem} from 'primeng/primeng';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationService } from "app/shared/notification.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ListarDepartamentoComponent } from './pages/departamentos/listar-departamento/listar-departamento.component';
import { CadastrarDepartamentoComponent } from './pages/departamentos/cadastrar-departamento/cadastrar-departamento.component';
import { ListarCursoComponent } from './pages/cursos/listar-curso/listar-curso.component';
import { CadastrarCursoComponent } from './pages/cursos/cadastrar-curso/cadastrar-curso.component';
import { CadastrarMissaoComponent } from './pages/missoes/cadastrar-missao/cadastrar-missao.component';
import { ListarMissaoComponent } from './pages/missoes/listar-missao/listar-missao.component';



const routes: Routes = [
    { path: 'listar-cursos', component: ListarCursoComponent, canActivate: [LoggedInGuard] },
    { path: 'cadastrar-curso', component: CadastrarCursoComponent, canActivate: [LoggedInGuard] },
    { path: 'listar-departamentos', component: ListarDepartamentoComponent, canActivate: [LoggedInGuard] },
    { path: 'cadastrar-departamento', component: CadastrarDepartamentoComponent, canActivate: [LoggedInGuard] },
    { path: 'listar-missao', component: ListarMissaoComponent, canActivate: [LoggedInGuard] },
    { path: 'cadastrar-missao', component: CadastrarMissaoComponent, canActivate: [LoggedInGuard] },
    { path: 'new-password', component: NewPasswordComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardPageComponent, canActivate: [LoggedInGuard] },
    { path: '**', component: HomePageComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        DisplayUserComponent,
        LoginUserComponent,
        RegisterUserComponent,
        ResetPasswordComponent,
        HomePageComponent,
        RegisterPageComponent,
        AllInOnePageComponent,
        LoginPageComponent,
        DashboardPageComponent,
        NewPasswordComponent,
        ListarDepartamentoComponent,
        CadastrarDepartamentoComponent,
        ListarCursoComponent,
        CadastrarCursoComponent,
        CadastrarMissaoComponent,
        ListarMissaoComponent,
        

    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule.enablePersistence(),
        AngularFireAuthModule,
        ToggleButtonModule,    
        InputMaskModule,    
        MenubarModule,
        RouterModule.forRoot(routes),
        SimpleNotificationsModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [AuthService,DatabaseService, LoggedInGuard, NotificationService ],
    bootstrap: [AppComponent]
    
})
export class AppModule {
    constructor(){
        console.log("module");
    }
}
