import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { BUTTON_VARIANTS_CODE } from './button-variants.code';

@Component({
  selector: 'app-button-variants',
  standalone: true,
  imports: [DemoShell, MatButtonModule, MatIconModule],
  templateUrl: './button-variants.html',
  styleUrls: ['./button-variants.css'],
})
export class ButtonVariantsDemo {
  protected readonly code = BUTTON_VARIANTS_CODE;
}
