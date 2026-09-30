import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { ConfirmDialogComponent } from './confirm-dialog';
import { DIALOGS_CODE } from './dialogs.code';

@Component({
  selector: 'app-dialogs',
  standalone: true,
  imports: [DemoShell, MatButtonModule, MatIconModule],
  templateUrl: './dialogs.html',
  styleUrls: ['./dialogs.css'],
})
export class DialogsDemo {
  protected readonly code = DIALOGS_CODE;
  protected readonly lastResult = signal('Sin acciones todavía');

  private readonly dialog = inject(MatDialog);

  protected openConfirm(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Eliminar proyecto',
          message:
            'Esta acción no se puede deshacer. ¿Querés eliminar el proyecto "Component Library"?',
          confirmLabel: 'Eliminar',
        },
        width: '420px',
        maxWidth: '90vw',
      })
      .afterClosed()
      .subscribe((confirmed: boolean | undefined) => {
        this.lastResult.set(
          confirmed ? 'Confirmación aceptada' : 'Confirmación cancelada'
        );
      });
  }
}
