import { Routes } from '@angular/router';
import { HomeComponent } from './Componentes/home/home.component';
import { LoginComponent } from './Componentes/login/login.component';
import { StorageComponent } from './Componentes/storage/storage.component';
import { FaqInfoComponent } from './Componentes/faq-info/faq-info.component';
import { UserListComponent } from './superAdmin/user-list/user-list.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'storage', component: StorageComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'FAQ', component: FaqInfoComponent },
];
