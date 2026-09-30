import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { SELECT_AUTOCOMPLETE_CODE } from './select-autocomplete.code';

@Component({
  selector: 'app-select-autocomplete',
  standalone: true,
  imports: [
    DemoShell,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  templateUrl: './select-autocomplete.html',
  styleUrls: ['./select-autocomplete.css'],
})
export class SelectAutocompleteDemo {
  protected readonly code = SELECT_AUTOCOMPLETE_CODE;

  protected readonly frameworks = ['Angular', 'React', 'Vue', 'Svelte', 'SolidJS'];
  protected readonly frameworkCtrl = new FormControl('', { nonNullable: true });

  protected readonly countries = [
    'Argentina',
    'Bolivia',
    'Brasil',
    'Chile',
    'Colombia',
    'Costa Rica',
    'Ecuador',
    'El Salvador',
    'Guatemala',
    'Honduras',
    'México',
    'Nicaragua',
    'Panamá',
    'Paraguay',
    'Perú',
    'República Dominicana',
    'Uruguay',
    'Venezuela',
  ];
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

  protected summary(): string {
    const framework = this.frameworkCtrl.value || '—';
    const country = this.countryCtrl.value || '—';
    return framework + ' · ' + country;
  }
}
