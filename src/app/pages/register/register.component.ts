import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterRequest } from '../../models/User/Requests/register-request.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  register(): void {
    if (this.form.invalid) return;

    const { name, email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.error = 'As senhas não coincidem.';
      return;
    }

    const request: RegisterRequest = {
      name: name,
      email: email,
      password: password,
    };

    this.authService.register(request).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/login']);
        } else {
          this.error = res.message || 'Erro ao registrar.';
        }
      },
      error: (err) => {
        if(err.status === 409){
          this.error = 'Usuário com este email já existe';
        }else {
          this.error = 'Erro Inesperado.';
        }
      },
    });
  }
}
