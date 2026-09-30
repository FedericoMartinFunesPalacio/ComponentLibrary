import { DemoCode } from '../../../../core/catalog.models';

export const DIALOGS_CODE: DemoCode = {
  html: `<button mat-flat-button color="warn" (click)="openConfirm()">
  <mat-icon>delete</mat-icon>
  Eliminar proyecto
</button>`,
  css: `.dialog-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.dialog-result {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}`,
  ts: `// ---------- confirm-dialog.ts (componente reutilizable) ----------
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.css'],
})
export class ConfirmDialogComponent {
  protected readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
  protected readonly ref = inject(MatDialogRef<ConfirmDialogComponent, boolean>);
}

// ---------- confirm-dialog.html ----------
// <h2 mat-dialog-title class="confirm-title">
//   <span class="confirm-icon"><mat-icon>warning</mat-icon></span>
//   {{ data.title }}
// </h2>
// <mat-dialog-content>
//   <p class="confirm-message">{{ data.message }}</p>
// </mat-dialog-content>
// <mat-dialog-actions align="end">
//   <button mat-stroked-button mat-dialog-close>{{ data.cancelLabel ?? 'Cancelar' }}</button>
//   <button mat-flat-button color="primary" [mat-dialog-close]="true">
//     {{ data.confirmLabel ?? 'Aceptar' }}
//   </button>
// </mat-dialog-actions>

// ---------- uso en el componente que abre el diálogo ----------
import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogs',
  standalone: true,
  templateUrl: './dialogs.html',
})
export class DialogsDemo {
  protected readonly lastResult = signal('Sin acciones todavía');

  private readonly dialog = inject(MatDialog);

  protected openConfirm(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Eliminar proyecto',
          message: 'Esta acción no se puede deshacer.',
          confirmLabel: 'Eliminar',
        },
        width: '420px',
        maxWidth: '90vw',
      })
      .afterClosed()
      .subscribe((confirmed: boolean | undefined) => {
        this.lastResult.set(confirmed ? 'Confirmación aceptada' : 'Confirmación cancelada');
      });
  }
}`,
};
