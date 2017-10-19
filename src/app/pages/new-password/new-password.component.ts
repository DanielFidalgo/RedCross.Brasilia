import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from "app/shared/auth.service";
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import { NotificationService } from "app/shared/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  code: string;
  form: FormGroup;
  senha: AbstractControl;
  constructor(private route: ActivatedRoute ,private authService: AuthService, private fb: FormBuilder,private notification: NotificationService, private router: Router) { 
    this.form = fb.group({
      'senha': ['', Validators.required]
  });
  this.senha = this.form.controls['senha'];
    this.route.queryParams
    .filter(params => params.oobCode)
    .subscribe(params => {
      if(params.oobCode != null){
        this.code = params.oobCode;
        console.log(params.oobCode);
      }
    });
  }

  alterar(){
    this.authService.resetPassword(this.code, this.senha.value).then(()=>{
      this.notification.success("Sucesso!","A sua senha foi alterada");
      this.router.navigate(['']);
    }, error=>{
      this.notification.error(error);
    });
  }

  ngOnInit() {
  }

}
