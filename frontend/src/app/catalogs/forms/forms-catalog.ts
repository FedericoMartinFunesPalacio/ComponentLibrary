import { Component } from '@angular/core';

import { CatalogSection } from '../../shared/catalog-section/catalog-section';
import { ReactiveTextInputsDemo } from './demos/reactive-text-inputs/reactive-text-inputs';
import { SelectAutocompleteDemo } from './demos/select-autocomplete/select-autocomplete';
import { DateAndTogglesDemo } from './demos/date-and-toggles/date-and-toggles';

@Component({
  selector: 'app-forms-catalog',
  standalone: true,
  imports: [CatalogSection, ReactiveTextInputsDemo, SelectAutocompleteDemo, DateAndTogglesDemo],
  templateUrl: './forms-catalog.html',
})
export class FormsCatalog {}
