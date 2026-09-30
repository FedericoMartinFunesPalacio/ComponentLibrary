import { DemoCode } from '../../../../core/catalog.models';

export const PROGRESS_INDICATORS_CODE: DemoCode = {
  html: `<div class="progress-head">
  <span>Progreso del build</span>
  <strong>{{ progress() }}%</strong>
</div>

<mat-progress-bar mode="determinate" [value]="progress()"></mat-progress-bar>

<div class="custom-track">
  <div class="custom-fill" [style.width.%]="progress()"></div>
</div>

<button mat-stroked-button color="primary" (click)="play()">
  <mat-icon>animation</mat-icon>
  Reproducir animación
</button>

<mat-spinner diameter="56"></mat-spinner>
<mat-spinner diameter="56" mode="determinate" [value]="progress()"></mat-spinner>`,
  css: `.progress-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.progress-head strong {
  font-family: var(--font-family-mono);
  color: var(--color-primary);
}

.custom-track {
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--color-surface-sunken);
  overflow: hidden;
}

.custom-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  transition: width 60ms linear;
}`,
  ts: `import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { animate } from 'animejs';

@Component({
  selector: 'app-progress-indicators',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './progress-indicators.html',
  styleUrls: ['./progress-indicators.css'],
})
export class ProgressIndicatorsDemo {
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
}`,
};
