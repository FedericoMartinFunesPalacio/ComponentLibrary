import { Component } from '@angular/core';

import { CatalogSection } from '../../shared/catalog-section/catalog-section';
import { SnackbarsDemo } from './demos/snackbars/snackbars';
import { DialogsDemo } from './demos/dialogs/dialogs';
import { AlertsDemo } from './demos/alerts/alerts';

@Component({
  selector: 'app-feedback-catalog',
  standalone: true,
  imports: [CatalogSection, SnackbarsDemo, DialogsDemo, AlertsDemo],
  templateUrl: './feedback-catalog.html',
})
export class FeedbackCatalog {}
