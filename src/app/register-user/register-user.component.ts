import {Component, OnInit, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import {DatabaseService} from "app/shared/database.service";
import { Observable, BehaviorSubject } from "rxjs";
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {UserInfo} from "app/shared/user-info";
import {Cadastro} from "app/shared/cadastro";
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { NotificationService } from "app/shared/notification.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterUserComponent {
    admin: boolean
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
    maior:AbstractControl;
    semRG: AbstractControl;
    semCPF: AbstractControl;
    nameResponsavel: AbstractControl;
    cpfResponsavel: AbstractControl;
    rgResponsavel: AbstractControl;
    certidao: AbstractControl;
    @Output() onSuccess = new EventEmitter();
    @Output() onError = new EventEmitter();
    completo: boolean;
    constructor(private authService: AuthService,
                private databaseService: DatabaseService,
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private notification: NotificationService,
                private router: Router
            ) {
        this.admin = false;
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
        this.route.queryParams
        .filter(params => params.admin)
        .subscribe(params => {
          this.admin = (params.admin == 'true');
        });
        this.clear();
    }

    onSubmit() {
        
        if (this.form.valid) {
            
            if(!this.isLoggedIn.value){
               
                this.authService.createUser(this.email.value, this.password.value, this.name.value)
                .subscribe(
                    () => {
                        this.onSuccess.emit("success");
                        this.save();
                    },
                    err => this.onError.emit(err)
                ).add(()=>{
                    this.form.reset();
                });
                
            }else{
                
                       this.save();
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
    save(){
        let cadastro: Cadastro = new Cadastro(); 
        cadastro.nome= this.name.value;
        cadastro.email= this.email.value;
        cadastro.celular= this.telefone.value;
        cadastro.profissao= this.profissao.value;
        cadastro.formacao= this.formacao.value;
        if(!this.maior.value){
            if(this.semRG.value && this.semCPF.value){
                cadastro.certidao = this.certidao.value;
            }else{
                cadastro.rg = this.rg.value!=undefined?this.rg.value:"";
                cadastro.cpf = this.cpf.value!=undefined?this.cpf.value:"";
            }
            cadastro.cpfResponsavel = this.cpfResponsavel.value;
            cadastro.rgResponsavel = this.rgResponsavel.value;
            cadastro.nomeResponsavel = this.nameResponsavel.value;
            
        }else{
            cadastro.maior = true;
            cadastro.rg = this.rg.value!=undefined?this.rg.value:"";
            cadastro.cpf = this.cpf.value!=undefined?this.cpf.value:"";
        }
        cadastro.completo = true;
        cadastro.admin = this.admin;
        this.databaseService.newRegistry(cadastro);
        this.notification.success("Cadastro","O seu cadastro foi efetuado com sucesso!")
        this.router.navigate(['']);
        
    }

   
    clear(){
        this.form = this.fb.group({
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
            'password2': ['', Validators.required],
            'maior': ['', ''],
            'nameResponsavel': ['', ''],
            'cpfResponsavel': ['', ''],
            'rgResponsavel': ['', ''],
            'certidao': ['', ''],
            'semRG': ['', ''],
            'semCPF': ['', '']
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
        this.maior = this.form.controls['maior'];
        this.maior.setValue("true");
        this.nameResponsavel = this.form.controls['nameResponsavel'];
        this.cpfResponsavel = this.form.controls['cpfResponsavel'];
        this.rgResponsavel = this.form.controls['rgResponsavel'];
        this.certidao = this.form.controls['certidao'];
        this.semRG = this.form.controls['semRG'];
        this.semCPF = this.form.controls['semCPF'];
        this.semRG.setValue(false);
        this.semCPF.setValue(false);
        this.authService.currentCadastro().subscribe((cadastro)=>{
            this.completo = cadastro.completo;
            if(cadastro.nome != null && cadastro.email != null){
                this.name.setValue(cadastro.nome);
                this.email.setValue(cadastro.email);
                this.cpf.setValue(cadastro.cpf);
                this.rg.setValue(cadastro.rg);
                this.profissao.setValue(cadastro.profissao);
                this.formacao.setValue(cadastro.formacao);
                this.telefone.setValue(cadastro.celular);
                if(!cadastro.maior){
                    this.maior.setValue(cadastro.maior);
                    this.nameResponsavel.setValue(cadastro.nomeResponsavel);
                    if(cadastro.certidao !== null){
                        this.certidao.setValue(cadastro.certidao);
                        this.cpf.disable();
                        this.rg.disable();
                        this.semRG.setValue(true);
                        this.semCPF.setValue(true);
                    }else{
                        this.cpf.setValue(cadastro.cpf);
                        this.rg.setValue(cadastro.rg);
                    }
                    this.cpfResponsavel.setValue(cadastro.cpfResponsavel);
                    this.rgResponsavel.setValue(cadastro.rgResponsavel);
                    
                }
                
                this.password.disable();
                this.password2.disable();
            }else{
                this.authService.currentUser().subscribe((user)=>{
                    if(user.displayName != null && user.email != null){
                        this.name.setValue(user.displayName);
                        this.email.setValue(user.email);
                        
                        this.password.disable();
                        this.password2.disable();
                    }
                });
            }
                
            }) 
    }
    onChange(event){
        console.log(event);
        if(event.target.name ==='semRG' ){
            if(event.target.value){
                this.rg.disable()
            }else{
                this.rg.enable()
            }
        }else if(event.target.name ==='semCPF' ){
            if(event.target.value){
                this.cpf.disable()
                
            }else{
                this.cpf.enable()
            }
        }
    }

}
