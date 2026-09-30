import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { TOOLBAR_CODE } from './toolbar.code';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [DemoShell, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css'],
})
export class ToolbarDemo {
  protected readonly code = TOOLBAR_CODE;
}
