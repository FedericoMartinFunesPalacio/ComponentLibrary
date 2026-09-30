import { DemoCode } from '../../../../core/catalog.models';

export const ALERTS_CODE: DemoCode = {
  html: `@for (alert of alerts(); track alert.id) {
  <div class="alert" [attr.data-type]="alert.id" role="alert">
    <mat-icon class="alert-icon">{{ alert.icon }}</mat-icon>
    <div class="alert-body">
      <p class="alert-title">{{ alert.title }}</p>
      <p class="alert-text">{{ alert.text }}</p>
    </div>
    <button
      type="button"
      class="alert-close"
      [attr.aria-label]="'Cerrar alerta ' + alert.title"
      (click)="dismiss(alert.id)">
      <mat-icon>close</mat-icon>
    </button>
  </div>
} @empty {
  <p class="alerts-empty">Todas las alertas fueron cerradas.</p>
}`,
  css: `.alerts-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
  max-width: 640px;
  margin-inline: auto;
}

.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
}

.alert[data-type='success'] {
  background: var(--color-success-bg);
  border-color: var(--color-success);
  color: var(--color-on-success);
}

.alert[data-type='info'] {
  background: var(--color-info-bg);
  border-color: var(--color-info);
  color: var(--color-on-info);
}

.alert[data-type='warning'] {
  background: var(--color-warning-bg);
  border-color: var(--color-warning);
  color: var(--color-on-warning);
}

.alert[data-type='error'] {
  background: var(--color-danger-bg);
  border-color: var(--color-danger);
  color: var(--color-on-danger);
}

.alert-title {
  margin: 0;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
}

.alert-text {
  margin: 2px 0 0;
  font-size: var(--font-size-sm);
  opacity: 0.9;
}`,
  ts: `import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

type AlertType = 'success' | 'info' | 'warning' | 'error';

interface Alert {
  id: AlertType;
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './alerts.html',
  styleUrls: ['./alerts.css'],
})
export class AlertsDemo {
  protected readonly alerts = signal<Alert[]>([
    {
      id: 'success',
      icon: 'check_circle',
      title: '¡Operación exitosa!',
      text: 'Tu perfil se actualizó correctamente.',
    },
    {
      id: 'info',
      icon: 'info',
      title: 'Novedades disponibles',
      text: 'Hay una nueva versión de la biblioteca para revisar.',
    },
    {
      id: 'warning',
      icon: 'warning',
      title: 'Atención',
      text: 'Te quedan 2 días de prueba por vencer.',
    },
    {
      id: 'error',
      icon: 'error',
      title: 'No pudimos guardar',
      text: 'Revisá la conexión e intentá nuevamente.',
    },
  ]);

  protected dismiss(id: AlertType): void {
    this.alerts.update((current) => current.filter((alert) => alert.id !== id));
  }
}`,
};
