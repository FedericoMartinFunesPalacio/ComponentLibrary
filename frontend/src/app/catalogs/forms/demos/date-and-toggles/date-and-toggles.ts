import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { DATE_AND_TOGGLES_CODE } from './date-and-toggles.code';

@Component({
  selector: 'app-date-and-toggles',
  standalone: true,
  imports: [
    DemoShell,
    JsonPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
  ],
  templateUrl: './date-and-toggles.html',
  styleUrls: ['./date-and-toggles.css'],
})
export class DateAndTogglesDemo {
  protected readonly code = DATE_AND_TOGGLES_CODE;
  protected readonly currencies = ['ARS', 'USD', 'EUR'];

  protected readonly form = new FormGroup({
    fecha: new FormControl<Date | null>(null),
    newsletter: new FormControl(true),
    modoOscuro: new FormControl(false),
    moneda: new FormControl('ARS', { nonNullable: true }),
  });
}
