import { DemoCode } from '../../../../core/catalog.models';

export const REACTIVE_TEXT_INPUTS_CODE: DemoCode = {
  html: `<form class="demo-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
  <mat-form-field appearance="outline">
    <mat-label>Nombre completo</mat-label>
    <input matInput formControlName="nombre" placeholder="Ej: Ada Lovelace" />
    <mat-icon matPrefix>person</mat-icon>
    @if (hasError(nombre)) {
      <mat-error>
        @if (nombre.hasError('required')) {
          El nombre es obligatorio.
        } @else {
          Mínimo 3 caracteres.
        }
      </mat-error>
    }
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Email</mat-label>
    <input matInput type="email" formControlName="email" placeholder="ada@mail.com" />
    <mat-icon matPrefix>mail</mat-icon>
    @if (hasError(email)) {
      <mat-error>
        @if (email.hasError('required')) {
          El email es obligatorio.
        } @else {
          Ingresá un email válido.
        }
      </mat-error>
    }
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Contraseña</mat-label>
    <input matInput type="password" formControlName="password" placeholder="Mínimo 8 caracteres" />
    <mat-icon matPrefix>lock</mat-icon>
    @if (hasError(password)) {
      <mat-error>
        @if (password.hasError('required')) {
          La contraseña es obligatoria.
        } @else {
          Mínimo 8 caracteres.
        }
      </mat-error>
    }
  </mat-form-field>

  <div class="demo-form-actions">
    <button mat-flat-button color="primary" type="submit">Registrarme</button>
    <button mat-stroked-button type="button" (click)="reset()">Limpiar</button>
  </div>

  @if (success()) {
    <p class="demo-form-success">
      <mat-icon>check_circle</mat-icon>
      ¡Cuenta creada con éxito!
    </p>
  }
</form>`,
  css: `.demo-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
  max-width: 440px;
  margin-inline: auto;
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.demo-form-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.demo-form-success {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin: var(--space-2) 0 0;
  font-size: var(--font-size-sm);
  color: var(--color-success);
}`,
  ts: `import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css'],
})
export class RegisterForm {
  protected readonly submitted = signal(false);

  protected readonly form = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  protected get nombre() {
    return this.form.controls.nombre;
  }

  protected get email() {
    return this.form.controls.email;
  }

  protected get password() {
    return this.form.controls.password;
  }

  protected hasError(control: { invalid: boolean; touched: boolean }): boolean {
    return control.invalid && (control.touched || this.submitted());
  }

  protected submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Datos válidos:', this.form.getRawValue());
  }

  protected reset(): void {
    this.form.reset({ nombre: '', email: '', password: '' });
    this.submitted.set(false);
  }

  protected success(): boolean {
    return this.form.valid && this.submitted();
  }
}`,
};
