import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { TABS_CODE } from './tabs.code';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [DemoShell, MatTabsModule, MatIconModule],
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.css'],
})
export class TabsDemo {
  protected readonly code = TABS_CODE;

  protected readonly features = [
    'Componentes standalone',
    'Control flow @if / @for',
    'Formularios reactivos',
    'Estilos centralizados en variables.css',
  ];
}
