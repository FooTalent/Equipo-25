import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SupplierModel } from '../../interfaces/supplier-model';
import { SuppliersService } from '../../services/suppliers.service';
import { FooterComponent } from '../footer/footer.component';
import { HederComponent } from '../header/heder.component';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [ReactiveFormsModule, HederComponent, FooterComponent],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css',
})
export class SupplierFormComponent {
  toastrService = inject(ToastrService);
  SuppliersService: SuppliersService = inject(SuppliersService);

  newSupplierData = new FormGroup({
    thirdPartyData: new FormControl('', [Validators.required]),
    nitData: new FormControl('', [Validators.required]),
    phoneData: new FormControl('', [Validators.required]),
    emailData: new FormControl('', [Validators.required, Validators.email]),
    cityData: new FormControl('', [Validators.required]),
    departmentData: new FormControl('', [Validators.required]),
  });

  handleNewSupplierSubmit() {
    if (this.newSupplierData.valid) {
      const thirdParty = this.newSupplierData.value.thirdPartyData;
      const nit = this.newSupplierData.value.nitData;
      const phone = this.newSupplierData.value.phoneData;
      const email = this.newSupplierData.value.emailData;
      const city = this.newSupplierData.value.cityData;
      const department = this.newSupplierData.value.departmentData;

      if (
        typeof thirdParty === 'string' &&
        typeof nit === 'string' &&
        typeof phone === 'string' &&
        typeof email === 'string' &&
        typeof city === 'string' &&
        typeof department === 'string'
      ) {
        const newSupplier: SupplierModel = {
          thirdParty,
          nit,
          phone,
          email,
          city,
          department,
        };
        this.SuppliersService.createSupplier(newSupplier).subscribe(
          (res: any) => {
            // any porque si no hicimos nosotros el Backend, no sabremos qué vendrá de él
            console.log('Response: ', res);
            //const decoded = jwtHelperService.decodeToken(res.data.token);
            //console.log("decoded: ", decoded);
            if (res.state === 'Successful') {
              localStorage.setItem('token', res.data.token);
              //this.router.navigateByUrl('/home'); // Redirigir Way_1
            } else {
              //console.log("Invalid newSupplier")
              this.toastrService.error('Credenciales inválidas');
            }
          }
        );
      }
    } else {
      //console.log('Empty form filds');
      this.toastrService.warning('Campo de credenciales vacío');
    }
  }
}
