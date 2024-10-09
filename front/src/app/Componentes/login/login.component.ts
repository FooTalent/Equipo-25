import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
//import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
import { LoginCredentials } from '../../interfaces/login-credentials';
import { LoginService } from '../../services/login.service';

//const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  toastrService = inject(ToastrService);
  loginService: LoginService = inject(LoginService);

  loginCredentialsData = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  handleLoginSubmit() {
    if (this.loginCredentialsData.valid) {
      const email = this.loginCredentialsData.value.email;
      const password = this.loginCredentialsData.value.password;

      if (typeof email === 'string' && typeof password === 'string') {
        const credentials: LoginCredentials = {
          email,
          password,
        };
        this.loginService.login(credentials).subscribe((res: any) => {
          // any porque si no hacemos el Backend no sabemos qué vendrá de él
          //console.log("Response: ", res);
          //const decoded = jwtHelperService.decodeToken(res.data.token);
          //console.log("decoded: ", decoded);
          if (res.state === 'Successful') {
            localStorage.setItem('token', res.data.token);
            this.router.navigateByUrl('/shop'); // Redirigir Way_1
          } else {
            /* console.log("Invalid credentials") */
            this.toastrService.error('Credenciales inválidas');
          }
        });
      }
    } else {
      /* console.log("Empty form filds"); */
      this.toastrService.warning('Capo de credenciales vacío');
    }
  }
}

/* import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() loginRegistered = new EventEmitter<void>(); // Emitimos evento al registrar

  loginRegister: FormGroup;

  constructor(private loginService: LoginService) {
    this.loginRegister = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
      },
      { validators: this.passwordValidator } // Validador personalizado de contraseñas
    );
  }

  // Validador personalizado para contraseñas
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // Si las contraseñas no coinciden, devolvemos un error
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // Método para enviar el formulario
  handleLoginSubmit() {
    if (this.loginRegister.valid) {
      // Excluir el campo confirmPassword antes de enviar los datos
      const { confirmPassword, ...formValue } = this.loginRegister.value;

      // Agregamos el campo state, que siempre sera true
      const dataToSend = { ...formValue, state: true };

      // Enviamos el formulario al backend
      this.loginService.login(dataToSend).subscribe({
        next: (response) => {
          alert('Usuario registrado');
          this.loginRegistered.emit(); // Emitimos el evento al registrar correctamente
        },
        error: (error) => {
          console.error('Error en el registro', error);
          alert(
            'Ocurrió un error durante el registro, verifica la información.'
          );
        },
      });
    } else if (this.loginRegister.errors?.['passwordsMismatch']) {
      alert('Las contraseñas no coinciden');
    } else {
      alert('Faltan campos por llenar o hay errores en el formulario');
    }
  }
}
 */
