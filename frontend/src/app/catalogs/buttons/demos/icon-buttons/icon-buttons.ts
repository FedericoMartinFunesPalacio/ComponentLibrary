import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { ICON_BUTTONS_CODE } from './icon-buttons.code';

@Component({
  selector: 'app-icon-buttons',
  standalone: true,
  imports: [DemoShell, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './icon-buttons.html',
  styleUrls: ['./icon-buttons.css'],
})
export class IconButtonsDemo {
  protected readonly code = ICON_BUTTONS_CODE;
}
