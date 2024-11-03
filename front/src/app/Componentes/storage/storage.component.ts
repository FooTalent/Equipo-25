import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HederComponent } from '../header/heder.component';
import { FooterComponent } from '../footer/footer.component';
import { InvoicesFormComponent } from '../invoices-form/invoices-form.component';
import { FormsModule } from '@angular/forms';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import filter from 'rxjs';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [
    DatePipe,
    HederComponent,
    FooterComponent,
    CommonModule,
    InvoicesFormComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
})
export class StorageComponent implements OnInit {
  storage = inject(StorageService);
  alls: any[] = [];
  filters: any[] = [];
  resoult: any[] = [];
  searchForm = new FormGroup({
    term: new FormControl('', Validators.required),
  });
  isLoading = false; // Controla la visibilidad del loader

  handlesearch() {
    console.log('busca', this.searchForm.value.term);
    console.log(this.resoult);
    console.log(this.alls);

    const searchTerm = this.searchForm.value.term?.toLowerCase();

    const filtered = this.alls.filter((element) => {
      // Verificamos que invoiceName esté definido y que contenga el término de búsqueda
      return (
        element.invoiceName &&
        element.invoiceName.toLowerCase().includes(searchTerm)
      );
    });

    // Si hay resultados, los mostramos; si no, volvemos a mostrar todos los datos iniciales

    if (filtered.length > 0) {
      this.alls = filtered;
      console.log('2', filtered.length);
    } else {
      this.alls = this.resoult;
      console.log(this.alls);
      if (this.alls.length < 1) {
        this.resoult;
      }
    }
  }

  // Método para obtener el almacenamiento
  getstorage() {
    this.isLoading = true; // Mostrar el loader antes de cargar los datos

    this.storage.getStorage().subscribe(
      (answer: any) => {
        if (answer) {
          this.alls = answer;
          this.resoult = answer;
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

  reloadPage(): void {
    window.location.reload(); // Recarga la página actual
  }
}
