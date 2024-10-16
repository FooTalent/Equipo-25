import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
//import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
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
  toastrService = inject(ToastrService);
  loginService: LoginService = inject(LoginService);

  supplierData = new FormGroup({
    thirdPartyData: new FormControl('', [Validators.required]),
    nitData: new FormControl('', [Validators.required]),
    phoneData: new FormControl('', [Validators.required]),
    emailData: new FormControl('', [Validators.required, Validators.email]),
    cityData: new FormControl('', [Validators.required]),
    departmentData: new FormControl('', [Validators.required]),
  });

  handleLoginSubmit() {
    if (this.supplierData.valid) {
      const thirdPartyData = this.supplierData.value.thirdPartyData;
      const nitData = this.supplierData.value.nitData;
      const phoneData = this.supplierData.value.phoneData;
      const emailData = this.supplierData.value.emailData;
      const cityData = this.supplierData.value.cityData;
      const departmentData = this.supplierData.value.departmentData;

      if (
        typeof thirdPartyData === 'string' &&
        typeof nitData === 'string' &&
        typeof phoneData === 'string' &&
        typeof emailData === 'string' &&
        typeof cityData === 'string' &&
        typeof departmentData === 'string'
      ) {
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
            this.toastrService.error('Credenciales inválidas');
          }
        });
      }
    } else {
      /* console.log("Empty form filds"); */
      this.toastrService.warning('Campo de credenciales vacío');
    }
  }
}
