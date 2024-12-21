import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    },);
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.toastService.error('Por favor, corrija os erros no formulário!');
      return;
    }

    const { name, email, password } = this.signupForm.value;

    this.registerService.signup(email, name, password).subscribe(
      (response) => {
        this.toastService.success('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastService.error('Erro ao registrar usuário. Tente novamente!');
      }
    );
  }


  get passwordMismatch() {
    return this.signupForm.hasError('passwordMismatch') && this.signupForm.get('passwordConfirm')?.touched;
  }


  get isInvalid() {
    return (controlName: string) => {
      const control = this.signupForm.get(controlName);
      return control?.invalid && control?.touched;
    };
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
