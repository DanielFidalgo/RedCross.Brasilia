import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import {DatabaseService} from "app/shared/database.service";
import { Observable, BehaviorSubject } from "rxjs";
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
    form: FormGroup;
    email: AbstractControl;
    name: AbstractControl;
    password: AbstractControl;
    password2: AbstractControl;

    @Output() onSuccess = new EventEmitter();
    @Output() onError = new EventEmitter();

    constructor(private authService: AuthService,
                private databaseService: DatabaseService,
                private fb: FormBuilder) {
        this.form = fb.group({
            'name': ['', Validators.required],
            'email': ['', Validators.compose([
                Validators.required,
                Validators.email]
            )],
            'password': ['', Validators.required],
            'password2': ['', Validators.required]
        }, {validator: this.matchingPasswords('password', 'password2')});
        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.password2 = this.form.controls['password2'];
    }

    onSubmit() {
        if (this.form.valid) {
            this.authService.createUser(this.email.value, this.password.value, this.name.value)
                .subscribe(
                    () => {
                        this.authService.currentUser().subscribe((userInfo)=>{
                            this.databaseService.newRegistry(userInfo);
                        },err=>{});
                        this.onSuccess.emit("success");
                        this.form.reset();
                    },
                    err => this.onError.emit(err)
                );
        }
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }
}
