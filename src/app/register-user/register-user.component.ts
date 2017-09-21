import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import {DatabaseService} from "app/shared/database.service";
import { Observable, BehaviorSubject } from "rxjs";
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {UserInfo} from "app/shared/user-info"
import {Cadastro} from "app/shared/cadastro"

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
    form: FormGroup;
    email: AbstractControl;
    name: AbstractControl;
    cpf: AbstractControl;
    rg: AbstractControl;
    profissao: AbstractControl;
    formacao: AbstractControl;
    telefone: AbstractControl;
    password: AbstractControl;
    password2: AbstractControl;
    isLoggedIn = new BehaviorSubject<boolean>(false);

    @Output() onSuccess = new EventEmitter();
    @Output() onError = new EventEmitter();

    constructor(private authService: AuthService,
                private databaseService: DatabaseService,
                private fb: FormBuilder) {
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
        this.form = fb.group({
            'name': ['', Validators.required],
            'email': ['', Validators.compose([
                Validators.required,
                Validators.email]
            )],
            'cpf': ['', Validators.required],
            'rg': ['', Validators.required],
            'profissao': ['', Validators.required],
            'formacao': ['', Validators.required],
            'telefone': ['', Validators.required],
            'password': ['', Validators.required],
            'password2': ['', Validators.required]
        }, {validator: this.matchingPasswords('password', 'password2')});
        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.password2 = this.form.controls['password2'];
        this.cpf = this.form.controls['cpf'];
        this.rg = this.form.controls['rg'];
        this.profissao = this.form.controls['profissao'];
        this.formacao = this.form.controls['formacao'];
        this.telefone = this.form.controls['telefone'];
        if(this.isLoggedIn.value){
            this.authService.currentUser().subscribe((userInfo)=>{
                            this.name.setValue(userInfo.displayName);
                            this.email.setValue(userInfo.email);
                            this.cpf.setValue(userInfo.data.cpf);
                            this.telefone.setValue(userInfo.data.celular);
                            this.profissao.setValue(userInfo.data.profissao);
                            this.formacao.setValue(userInfo.data.formacao);
                            this.email.disable;
                        },err=>{});
        }
        
    }

    onSubmit() {
        if (this.form.valid) {
            if(!this.isLoggedIn.value){
            this.authService.createUser(this.email.value, this.password.value, this.name.value)
                .subscribe(
                    () => {
                        this.saveUserdb();
                        this.onSuccess.emit("success");
                        this.form.reset();
                    },
                    err => this.onError.emit(err)
                );
            }else{
                this.saveUserdb();
            }
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

    saveUserdb(){
        this.authService
        .currentUser()
        .subscribe((userInfo)=>{
                    let cadastro: Cadastro = new Cadastro(); 
                        cadastro.nome= this.name.value,
                        cadastro.email= this.email.value,
                        cadastro.cpf= this.cpf.value,
                        cadastro.rg= this.rg.value,
                        cadastro.celular= this.telefone.value
                        cadastro.profissao= this.profissao.value
                        cadastro.formacao= this.formacao.value
                      
                    let inputUser: UserInfo = new UserInfo();
                    inputUser.data = cadastro;
                    inputUser.displayName = userInfo.displayName;
                    inputUser.email = userInfo.email;
                    inputUser.uid = userInfo.uid;           
                    this.databaseService.newRegistry(inputUser); 
        },err=>{});
        
    }
}
