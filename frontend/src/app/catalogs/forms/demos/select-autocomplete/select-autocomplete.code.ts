import { DemoCode } from '../../../../core/catalog.models';

export const SELECT_AUTOCOMPLETE_CODE: DemoCode = {
  html: `<mat-form-field appearance="outline">
  <mat-label>Framework favorito</mat-label>
  <mat-select [formControl]="frameworkCtrl">
    @for (framework of frameworks; track framework) {
      <mat-option [value]="framework">{{ framework }}</mat-option>
    }
  </mat-select>
</mat-form-field>

<mat-form-field appearance="outline">
  <mat-label>País</mat-label>
  <input
    matInput
    [formControl]="countryCtrl"
    [matAutocomplete]="auto"
    placeholder="Escribí para filtrar..." />
  <mat-autocomplete #auto="matAutocomplete" autoActiveFirstOption>
    @for (country of filteredCountries(); track country) {
      <mat-option [value]="country">{{ country }}</mat-option>
    } @empty {
      <mat-option disabled>Sin resultados</mat-option>
    }
  </mat-autocomplete>
</mat-form-field>`,
  css: `.demo-select {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  align-items: start;
  gap: var(--space-4);
  width: 100%;
  max-width: 720px;
  margin-inline: auto;
}

.demo-select-summary {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin: 0;
  padding: var(--space-3) var(--space-4);
  background: var(--color-primary-container);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-on-primary-container);
}`,
  ts: `import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-country-picker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  templateUrl: './country-picker.html',
  styleUrls: ['./country-picker.css'],
})
export class CountryPicker {
  protected readonly frameworks = ['Angular', 'React', 'Vue', 'Svelte', 'SolidJS'];
  protected readonly frameworkCtrl = new FormControl('', { nonNullable: true });

  protected readonly countries = ['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'México', 'Perú', 'Uruguay'];
  protected readonly countryCtrl = new FormControl('', { nonNullable: true });
  protected readonly filteredCountries = signal<string[]>(this.countries);

  constructor() {
    this.countryCtrl.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      const term = (value ?? '').trim().toLowerCase();
      this.filteredCountries.set(
        term
          ? this.countries.filter((country) => country.toLowerCase().includes(term))
          : this.countries
      );
    });
  }
}`,
};
