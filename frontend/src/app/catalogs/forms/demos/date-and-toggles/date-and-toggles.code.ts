import { DemoCode } from '../../../../core/catalog.models';

export const DATE_AND_TOGGLES_CODE: DemoCode = {
  html: `<div class="demo-toggles">
  <mat-form-field appearance="outline">
    <mat-label>Fecha de nacimiento</mat-label>
    <input
      matInput
      [matDatepicker]="picker"
      [formControl]="form.controls.fecha"
      placeholder="dd/mm/aaaa" />
    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>

  <mat-checkbox [formControl]="form.controls.newsletter">
    Recibir el newsletter semanal
  </mat-checkbox>

  <mat-slide-toggle [formControl]="form.controls.modoOscuro">
    Activar modo oscuro
  </mat-slide-toggle>

  <fieldset class="demo-radio">
    <legend>Moneda</legend>
    <mat-radio-group [formControl]="form.controls.moneda" class="demo-radio-row">
      @for (currency of currencies; track currency) {
        <mat-radio-button [value]="currency">{{ currency }}</mat-radio-button>
      }
    </mat-radio-group>
  </fieldset>

  <pre class="demo-json">{{ form.value | json }}</pre>
</div>`,
  css: `.demo-toggles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-5);
  width: 100%;
  max-width: 760px;
  margin-inline: auto;
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.demo-toggles-column {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.demo-radio-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.demo-json {
  grid-column: 1 / -1;
  margin: 0;
  padding: var(--space-4);
  background: var(--code-bg);
  color: var(--code-text);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  overflow-x: auto;
}`,
  ts: `import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings-form',
  standalone: true,
  imports: [
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
  templateUrl: './settings-form.html',
  styleUrls: ['./settings-form.css'],
})
export class SettingsForm {
  protected readonly currencies = ['ARS', 'USD', 'EUR'];

  protected readonly form = new FormGroup({
    fecha: new FormControl<Date | null>(null),
    newsletter: new FormControl(true),
    modoOscuro: new FormControl(false),
    moneda: new FormControl('ARS', { nonNullable: true }),
  });
}`,
};
