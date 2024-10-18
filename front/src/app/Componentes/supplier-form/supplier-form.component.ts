import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
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
  router = inject(Router);
  //toastrService = inject(ToastrService);
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
      const nitNumber = this.newSupplierData.value.nitData;
      const nit = String(nitNumber);
      const phoneNumber = this.newSupplierData.value.phoneData;
      const phone = String(phoneNumber);
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
            console.log('Response: ', res);
            if (res._id == String) {
              //this.toastrService.error('Error agregando proveedor');
              alert('Error agregando proveedor');
            } else {
              //this.router.navigateByUrl('/suppliers'); // Redirigir Way_1
              this.router.navigateByUrl('/home'); // Redirigir Way_1
              //this.toastrService.success('¡Proveedor agregado con exito!');
              alert('¡Proveedor agregado con exito!');
            }
          }
        );
      }
    } else {
      //this.toastrService.warning('Campos vacios o CORREO inválido');
      alert('Campos vacios o CORREO inválido');
    }
  }
}
