import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { SNACKBARS_CODE } from './snackbars.code';

type SnackKind = 'success' | 'info' | 'error';

@Component({
  selector: 'app-snackbars',
  standalone: true,
  imports: [DemoShell, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './snackbars.html',
  styleUrls: ['./snackbars.css'],
})
export class SnackbarsDemo {
  protected readonly code = SNACKBARS_CODE;

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
}
