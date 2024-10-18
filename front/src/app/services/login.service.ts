import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginCredentials } from '../interfaces/login-credentials';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}
  httpClient = inject(HttpClient);
  router = inject(Router);
  toastrService = inject(ToastrService);

  /* API_URL = "http://18.118.115.16:3000/login"; */
  // BACKEND AWS URL a donde se harán las peticiones (del login)
  API_URL = 'http://localhost:3000/login';

  login(userCredentials: LoginCredentials) {
    return this.httpClient.post(this.API_URL, userCredentials);
  }

  validateToken(token: string) {
    return this.httpClient.get(`${this.API_URL}/${token}`);
  }

  isLoged() {
    if (localStorage.getItem('token')) {
      /* console.log("Is loged") */
      return true;
    } else {
      /* console.log("Isn't loged") */
      return false;
    }
  }

  // Consumir esta func en el botón de Logout
  logout() {
    localStorage.removeItem('token');
    this.toastrService.info('Sesión cerrada');
    this.router.navigate(['/login']); //Redirigir al Login
  }
}
