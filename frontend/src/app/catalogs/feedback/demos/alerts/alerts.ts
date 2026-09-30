import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { ALERTS_CODE } from './alerts.code';

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
  imports: [DemoShell, MatIconModule, MatButtonModule],
  templateUrl: './alerts.html',
  styleUrls: ['./alerts.css'],
})
export class AlertsDemo {
  protected readonly code = ALERTS_CODE;

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
}
