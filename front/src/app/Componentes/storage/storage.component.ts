import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.css',
})
export class StorageComponent {
  httpClient = inject(HttpClient);

  API_URL = 'http://localhost:3000/invoices'; // URL a donde se harán las peticiones (de crear producto)

  getIvoices() {
    return this.httpClient.get(this.API_URL);
  }

  getIvoicesById(id: string) {
    return this.httpClient.get(this.API_URL + '/' + id);
  }
}
