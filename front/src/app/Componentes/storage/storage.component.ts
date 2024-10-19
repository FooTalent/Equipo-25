import { Component, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { DatePipe } from '@angular/common';
import { HederComponent } from "../header/heder.component";
@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [DatePipe, HederComponent],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.css',
})
export class StorageComponent {
  storage = inject(StorageService);
  alls: any[] = [];

  getstorage() {
    this.storage.getStorage().subscribe((answer: any) => {
      console.log('answ: ', answer);
      if (answer) {
        this.alls = answer;
        console.log('storage read correctly');
      } else {
        console.log('ups an error has ocurred');
      }
      this.alls = answer;
    });
  }
  ngOnInit() {
    this.getstorage();
  }
}
