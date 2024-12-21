import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formLogin: FormGroup;


  constructor(private fb: FormBuilder, private loginService: LoginService, private route: Router, private toast: ToastrService) {
    this.formLogin = this.criarFormLogin();
  }

  ngOnInit(): void {
  }

  public criarFormLogin(): FormGroup {
    return this.fb.group({
      login: ["", [Validators.required, Validators.minLength(6)]], // Atualizado de 'username' para 'login'
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  public submitForm() {
    const { login, password } = this.formLogin.value;
    this.formLogin.reset();

    this.loginService.login(login, password).subscribe(
      res => {
        this.toast.success("Login efetuado com sucesso");
        this.route.navigate(['/event']);
      },
      err => {
        this.toast.error(err);
      }
    );
  }

  goToRegister() {
    this.route.navigate(['/register']);
  }


}
