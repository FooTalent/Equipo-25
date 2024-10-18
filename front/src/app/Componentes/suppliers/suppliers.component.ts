import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersService } from '../../services/suppliers.service';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule, SupplierFormComponent],
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  adata: any[] = [];
  showForm = false;
  selectedSupplier: any = null;
  showConfirmDelete = false; // Controla si se muestra el diálogo de confirmación
  supplierToDelete: any = null; // Almacena el proveedor que se va a eliminar

  constructor(private suppliersService: SuppliersService) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.suppliersService.getSuppliers().subscribe((data: any[]) => {
      this.adata = data;
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  handleFormClosed() {
    this.showForm = false;
    this.selectedSupplier = null;
    this.getAllSuppliers();
  }

  openForm(supplier: any = null) {
    this.selectedSupplier = supplier;
    this.showForm = true;
  }

  // Mostrar el diálogo de confirmación
  confirmDelete(supplier: any) {
    this.supplierToDelete = supplier;
    this.showConfirmDelete = true; // Muestra el diálogo de confirmación
  }

  // Eliminar el proveedor seleccionado
  deleteSupplier() {
    if (this.supplierToDelete && this.supplierToDelete._id) {
      this.suppliersService
        .deleteSupplierById(this.supplierToDelete._id)
        .subscribe(
          (res: any) => {
            alert('Proveedor eliminado con éxito');
            this.getAllSuppliers(); // Refresca la lista de proveedores
            this.showConfirmDelete = false;
          },
          (error: any) => {
            alert('Error eliminando proveedor');
            this.showConfirmDelete = false;
          }
        );
    }
  }

  // Cancelar la eliminación
  cancelDelete() {
    this.showConfirmDelete = false;
    this.supplierToDelete = null; // Limpia el proveedor a eliminar
  }
}
