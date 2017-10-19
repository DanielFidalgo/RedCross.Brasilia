import {Component, Output, EventEmitter} from "@angular/core";
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "app/shared/auth.service";
import { NotificationService } from "app/shared/notification.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
    form: FormGroup;
    email: AbstractControl;
    @Output() onSuccess = new EventEmitter();
    @Output() onError = new EventEmitter();

    constructor(private authService: AuthService, private fb: FormBuilder, private notification: NotificationService, private router: Router) {
        this.form = fb.group({
            'email': ['', Validators.required]
        });
        this.email = this.form.controls['email'];
    }

    reset() {
        if (this.form.valid) {
            this.authService.sendPasswordResetEmail(this.email.value)
                .subscribe(
                    () => {
                        this.notification.success("Sucesso!","Um email com instruções foi enviado.");
                        this.router.navigate(['']);
                    },
                    err => this.notification.error(err)
                );

        }
    }
}
