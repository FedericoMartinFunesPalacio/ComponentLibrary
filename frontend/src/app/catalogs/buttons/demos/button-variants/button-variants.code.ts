import { DemoCode } from '../../../../core/catalog.models';

export const BUTTON_VARIANTS_CODE: DemoCode = {
  html: `<div class="btn-grid">
  <div class="btn-row">
    <button mat-button>Texto</button>
    <button mat-flat-button>Plano</button>
    <button mat-raised-button>Elevado</button>
    <button mat-stroked-button>Contorneado</button>
  </div>

  <div class="btn-row">
    <button mat-flat-button color="primary">Primary</button>
    <button mat-raised-button color="accent">Accent</button>
    <button mat-stroked-button color="warn">Warn</button>
    <button mat-button color="primary">Texto primary</button>
  </div>

  <div class="btn-row">
    <button mat-fab aria-label="Nueva tarea">
      <mat-icon>add</mat-icon>
    </button>
    <button mat-mini-fab color="primary" aria-label="Editar">
      <mat-icon>edit</mat-icon>
    </button>
    <button mat-raised-button disabled>Deshabilitado</button>
    <button mat-flat-button>
      <mat-icon>download</mat-icon>
      Descargar
    </button>
  </div>
</div>`,
  css: `.btn-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  width: 100%;
  max-width: 640px;
  margin-inline: auto;
}

.btn-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
}`,
  ts: `import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-variants',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button-variants.html',
  styleUrls: ['./button-variants.css'],
})
export class ButtonVariantsDemo {}`,
};
