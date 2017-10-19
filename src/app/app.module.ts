import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {firebaseConfig} from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
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



const routes: Routes = [
    { path: 'new-password', component: NewPasswordComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'all-in-one', component: AllInOnePageComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardPageComponent, canActivate: [LoggedInGuard] },
    { path: '', component: HomePageComponent }
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
        

    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, "cruzvermelhadf"),
        AngularFireDatabaseModule,
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
}
