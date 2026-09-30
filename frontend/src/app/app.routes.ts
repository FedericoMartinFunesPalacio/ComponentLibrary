import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/catalog-page/catalog-page').then((m) => m.CatalogPage),
  },
  { path: '**', redirectTo: '' },
];
