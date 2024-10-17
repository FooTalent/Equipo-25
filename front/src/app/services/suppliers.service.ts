import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupplierModel } from '../interfaces/supplier-model';
@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor() {}
  httpClient = inject(HttpClient);
  router = inject(Router);
  toastrService = inject(ToastrService);

  // BACKEND URL a donde se harán las peticiones (del login)
  API_URL = 'http://localhost:3000/Supplier';

  createSupplier(supplierData: SupplierModel) {
    return this.httpClient.post(this.API_URL, supplierData);
  }

  getSupplier() {
    return this.httpClient.get(this.API_URL);
  }

  deleteSupplierById(id: string) {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}
