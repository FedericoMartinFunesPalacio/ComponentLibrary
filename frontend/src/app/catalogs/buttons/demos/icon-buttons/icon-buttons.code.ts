import { DemoCode } from '../../../../core/catalog.models';

export const ICON_BUTTONS_CODE: DemoCode = {
  html: `<button mat-icon-button aria-label="Editar">
  <mat-icon>edit</mat-icon>
</button>
<button mat-icon-button color="primary" aria-label="Favorito">
  <mat-icon>favorite</mat-icon>
</button>
<button mat-icon-button color="warn" aria-label="Eliminar">
  <mat-icon>delete</mat-icon>
</button>
<button mat-icon-button disabled aria-label="Bloqueado">
  <mat-icon>lock</mat-icon>
</button>

<button mat-icon-button matBadge="4" matBadgeColor="primary" aria-label="Notificaciones">
  <mat-icon>notifications</mat-icon>
</button>
<button mat-icon-button matBadge="12" matBadgeColor="accent" matBadgeSize="small">
  <mat-icon>shopping_cart</mat-icon>
</button>
<button mat-icon-button matBadge="99+" matBadgeColor="warn" matBadgeSize="small">
  <mat-icon>mail</mat-icon>
</button>`,
  css: `.icon-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
}

.icon-separator {
  width: 1px;
  height: 28px;
  background: var(--color-border-strong);
}`,
  ts: `import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-icon-buttons',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './icon-buttons.html',
  styleUrls: ['./icon-buttons.css'],
})
export class IconButtonsDemo {}`,
};
