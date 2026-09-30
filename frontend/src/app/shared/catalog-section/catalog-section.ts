import { Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CATALOGS } from '../../core/catalog.data';

/** Encabezado + contenedor estándar de cada catálogo. */
@Component({
  selector: 'app-catalog-section',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './catalog-section.html',
  styleUrls: ['./catalog-section.css'],
})
export class CatalogSection {
  readonly catalogId = input.required<string>();

  protected readonly meta = computed(() => {
    const catalog = CATALOGS.find((item) => item.id === this.catalogId());
    if (!catalog) {
      throw new Error(`No existe el catálogo "${this.catalogId()}" en catalog-data.ts`);
    }
    return catalog;
  });
}
