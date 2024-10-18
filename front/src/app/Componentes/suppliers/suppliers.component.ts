import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para standalone components
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms'; // Para trabajar con ngModel
import { SuppliersService } from '../../services/suppliers.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Importando CommonModule y FormsModule para standalone components
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css',
})
export class SuppliersComponent implements OnInit {
  suppliersForm: FormGroup;
  adata: any[] = []; // Declaramos la propiedad adata para contener los datos de los proveedores

  constructor(
    private fb: FormBuilder,
    private suppliersService: SuppliersService
  ) {
    this.suppliersForm = this.fb.group({
      thirdParty: ['', Validators.required],
      nit: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Asignamos los datos recibidos del servicio a la propiedad 'adata'
    this.suppliersService.getSupplier().subscribe((data: any[]) => {
      this.adata = data; // Asignamos los datos a 'adata'
    });
  }

  onSubmit() {
    if (this.suppliersForm.valid) {
      this.suppliersService.createSupplier(this.suppliersForm.value).subscribe(
        (response) => {
          console.log('Proveedor creado exitosamente', response);
        },
        (error) => {
          console.error('Error al crear el proveedor', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
