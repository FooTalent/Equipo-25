import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
//import { JwtHelperService } from "@auth0/angular-jwt";
/* import { ToastrService } from 'ngx-toastr'; */
import { LoginCredentials } from '../../interfaces/login-credentials';
import { LoginService } from '../../services/login.service';
import { FooterComponent } from '../footer/footer.component';
import { HederComponent } from '../header/heder.component';

//const jwtHelperService = new JwtHelperService();
@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [ReactiveFormsModule, HederComponent, FooterComponent],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css',
})
export class SupplierFormComponent {
  router = inject(Router);
  /* toastrService = inject(ToastrService); */
  loginService: LoginService = inject(LoginService);

  loginCredentialsData = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  handleSupplierSubmit() {
    if (this.supplierData.valid) {
      const email = this.supplierData.value.email;
      const password = this.supplierData.value.password;

      if (typeof email === 'string' && typeof password === 'string') {
        const credentials: LoginCredentials = {
          email,
          password,
        };
        this.loginService.login(credentials).subscribe((res: any) => {
          // any porque si no hacemos el Backend no sabemos qué vendrá de él
          //console.log('Response: ', res);
          //const decoded = jwtHelperService.decodeToken(res.data.token);
          //console.log("decoded: ", decoded);
          if (res.state === 'Successful') {
            localStorage.setItem('token', res.data.token);
            //this.router.navigateByUrl('/home'); // Redirigir Way_1
          } else {
            /* console.log("Invalid credentials") */
            /* this.toastrService.error('Credenciales inválidas'); */
          }
        });
      }
    } else {
      /* console.log("Empty form filds"); */
      /* this.toastrService.warning('Campo de credenciales vacío'); */
    }
  }
}
