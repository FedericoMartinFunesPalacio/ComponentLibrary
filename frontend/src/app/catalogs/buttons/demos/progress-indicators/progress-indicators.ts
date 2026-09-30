import { MatIconModule } from '@angular/material/icon';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { animate } from 'animejs';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { PROGRESS_INDICATORS_CODE } from './progress-indicators.code';

@Component({
  selector: 'app-progress-indicators',
  standalone: true,
  imports: [
    DemoShell,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './progress-indicators.html',
  styleUrls: ['./progress-indicators.css'],
})
export class ProgressIndicatorsDemo {
  protected readonly code = PROGRESS_INDICATORS_CODE;
  protected readonly progress = signal(0);

  protected play(): void {
    const state = { value: this.progress() >= 100 ? 0 : this.progress() };

    animate(state, {
      value: [state.value, 100],
      duration: 2400,
      ease: 'inOutCubic',
      onUpdate: () => this.progress.set(Math.round(state.value)),
      onComplete: () => this.progress.set(100),
    });
  }
}
