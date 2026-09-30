import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { REACTIVE_TEXT_INPUTS_CODE } from './reactive-text-inputs.code';

@Component({
  selector: 'app-reactive-text-inputs',
  standalone: true,
  imports: [
    DemoShell,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './reactive-text-inputs.html',
  styleUrls: ['./reactive-text-inputs.css'],
})
export class ReactiveTextInputsDemo {
  protected readonly code = REACTIVE_TEXT_INPUTS_CODE;
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

  protected hasError(control: { invalid: boolean; touched: boolean; errors: object | null }): boolean {
    return control.invalid && (control.touched || this.submitted());
  }

  protected submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  protected reset(): void {
    this.form.reset({ nombre: '', email: '', password: '' });
    this.submitted.set(false);
  }

  protected success(): boolean {
    return this.form.valid && this.submitted();
  }
}
