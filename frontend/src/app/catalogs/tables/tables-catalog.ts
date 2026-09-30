import { Component } from '@angular/core';

import { CatalogSection } from '../../shared/catalog-section/catalog-section';
import { DataTableDemo } from './demos/data-table/data-table';

@Component({
  selector: 'app-tables-catalog',
  standalone: true,
  imports: [CatalogSection, DataTableDemo],
  templateUrl: './tables-catalog.html',
})
export class TablesCatalog {}
