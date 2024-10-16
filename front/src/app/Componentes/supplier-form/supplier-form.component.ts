import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
/* import { FooterComponent } from '../footer/footer.component';
import { HederComponent } from '../header/heder.component'; */

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule /* , HederComponent, FooterComponent */,
  ],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css',
})
export class SupplierFormComponent implements OnInit {
  supplierRegister: FormGroup;

  constructor(private form: FormBuilder) {
    this.supplierRegister = new FormGroup({
      thirdPartyData: new FormControl('', [Validators.required]),
      nitData: new FormControl('', [Validators.required]),
      phoneData: new FormControl('', [Validators.required]),
      emailData: new FormControl('', [Validators.required, Validators.email]),
      cityData: new FormControl('', [Validators.required]),
      departmentData: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  /* // Alternar visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  } */

  // Método para enviar el formulario
  onSubmit() {
    if (this.supplierRegister.valid) {
      const { confirmPassword, ...formValue } = this.supplierRegister.value;
      const dataToSend = { ...formValue, state: true };

      if (this.user) {
        // Actualizamos el usuario si ya existe (modo edición)
        const userId = this.user._id;
        this.usersService.updateUser(userId, dataToSend).subscribe({
          next: (response) => {
            alert('Usuario actualizado correctamente');
            this.userEdited.emit(); // Emitimos evento de usuario editado
          },
          error: (error) => {
            console.error('Error al actualizar el usuario', error);
            alert('Ocurrió un error durante la actualización.');
          },
        });
      } else {
        // Creamos un nuevo usuario (modo creación)
        this.usersService.createUser(dataToSend).subscribe({
          next: (response) => {
            alert('Usuario registrado correctamente');
            this.supplierRegistered.emit(); // Emitimos evento de usuario registrado
          },
          error: (error) => {
            console.error('Error al registrar el usuario', error);
            alert('Ocurrió un error durante el registro.');
          },
        });
      }
    } else if (this.supplierRegister.errors?.['passwordsMismatch']) {
      alert('Las contraseñas no coinciden');
    } else if (
      this.supplierRegister.get('password')?.errors?.['passwordStrength']
    ) {
      alert(
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.'
      );
    } else {
      alert('Faltan campos por llenar.');
    }
  }
}
