import { DemoCode } from '../../../../core/catalog.models';

export const SNACKBARS_CODE: DemoCode = {
  html: `<button mat-flat-button color="primary" (click)="show('success')">
  <mat-icon>check_circle</mat-icon>
  Éxito
</button>
<button mat-stroked-button (click)="show('info')">
  <mat-icon>info</mat-icon>
  Información
</button>
<button mat-stroked-button color="warn" (click)="show('error')">
  <mat-icon>error</mat-icon>
  Error
</button>`,
  css: `/* Van en styles.css: el snackbar se renderiza fuera de los componentes. */
.app-snack.app-snack-success {
  --mat-snackbar-container-color: var(--color-success);
  --mat-snackbar-supporting-text-color: var(--color-text-inverse);
  --mat-snackbar-action-color: var(--color-text-inverse);
}

.app-snack.app-snack-info {
  --mat-snackbar-container-color: var(--color-info);
  --mat-snackbar-supporting-text-color: var(--color-text-inverse);
  --mat-snackbar-action-color: var(--color-text-inverse);
}

.app-snack.app-snack-error {
  --mat-snackbar-container-color: var(--color-danger);
  --mat-snackbar-supporting-text-color: var(--color-text-inverse);
  --mat-snackbar-action-color: var(--color-text-inverse);
}`,
  ts: `import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

type SnackKind = 'success' | 'info' | 'error';

@Component({
  selector: 'app-snackbars',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './snackbars.html',
  styleUrls: ['./snackbars.css'],
})
export class SnackbarsDemo {
  private readonly snackBar = inject(MatSnackBar);

  protected show(kind: SnackKind): void {
    const config = {
      success: {
        message: 'Cambios guardados correctamente.',
        action: 'Deshacer',
        duration: 4000,
        panelClass: ['app-snack', 'app-snack-success'],
      },
      info: {
        message: 'Tenés 3 mensajes nuevos.',
        action: 'Ver',
        duration: 4000,
        panelClass: ['app-snack', 'app-snack-info'],
      },
      error: {
        message: 'No se pudo conectar con el servidor.',
        action: 'Reintentar',
        duration: 6000,
        panelClass: ['app-snack', 'app-snack-error'],
      },
    }[kind];

    const ref = this.snackBar.open(config.message, config.action, {
      duration: config.duration,
      panelClass: config.panelClass,
    });

    ref.onAction().subscribe(() => {
      this.snackBar.open('Acción ejecutada: ' + config.action, undefined, { duration: 2500 });
    });
  }
}`,
};
