import { Component } from '@angular/core';

import { CatalogSection } from '../../shared/catalog-section/catalog-section';
import { ToolbarDemo } from './demos/toolbar/toolbar';
import { TabsDemo } from './demos/tabs/tabs';
import { BreadcrumbsDemo } from './demos/breadcrumbs/breadcrumbs';
import { CardsDemo } from './demos/cards/cards';

@Component({
  selector: 'app-navigation-catalog',
  standalone: true,
  imports: [CatalogSection, ToolbarDemo, TabsDemo, BreadcrumbsDemo, CardsDemo],
  templateUrl: './navigation-catalog.html',
})
export class NavigationCatalog {}
