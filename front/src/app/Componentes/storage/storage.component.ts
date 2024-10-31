import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HederComponent } from '../header/heder.component';
import { FooterComponent } from '../footer/footer.component';
import { InvoicesFormComponent } from '../invoices-form/invoices-form.component';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [
    DatePipe,
    HederComponent,
    FooterComponent,
    CommonModule,
    InvoicesFormComponent,
  ],
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
})
export class StorageComponent implements OnInit {
  storage = inject(StorageService);
  alls: any[] = [];
  isLoading = false; // Controla la visibilidad del loader

  // Método para obtener el almacenamiento
  getstorage() {
    this.isLoading = true; // Mostrar el loader antes de cargar los datos

    this.storage.getStorage().subscribe(
      (answer: any) => {
        if (answer) {
          this.alls = answer;
        } else {
          console.log('No se encontraron datos');
        }
        this.isLoading = false; // Ocultar el loader después de obtener los datos
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
        this.isLoading = false;
      }
    );
  }

  // Inicialización del componente
  ngOnInit() {
    this.getstorage();
  }
}
