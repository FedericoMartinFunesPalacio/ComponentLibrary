import { DemoCode } from '../../../../core/catalog.models';

export const CARDS_CODE: DemoCode = {
  html: `<mat-card class="demo-card">
  <mat-card-header>
    <div mat-card-avatar class="demo-card-avatar">
      <mat-icon>person</mat-icon>
    </div>
    <mat-card-title>Ada Lovelace</mat-card-title>
    <mat-card-subtitle>Tech Lead · Plataforma</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <p>Encargada del diseño de la biblioteca de componentes.</p>
  </mat-card-content>
  <mat-card-actions align="end">
    <button mat-button>Ver perfil</button>
    <button mat-flat-button color="primary">Seguir</button>
  </mat-card-actions>
</mat-card>

<mat-card class="demo-card">
  <div class="demo-card-media">
    <span class="demo-card-badge">Destacado</span>
    <mat-icon>auto_awesome</mat-icon>
  </div>
  <mat-card-header>
    <mat-card-title>Componentes v1.0</mat-card-title>
    <mat-card-subtitle>15 demos disponibles</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <div class="demo-card-track"><div class="demo-card-fill"></div></div>
  </mat-card-content>
  <mat-card-actions align="end">
    <button mat-icon-button (click)="toggleFavorite()" aria-label="Favorito">
      <mat-icon>{{ favorite() ? 'favorite' : 'favorite_border' }}</mat-icon>
    </button>
    <button mat-button>Compartir</button>
    <button mat-flat-button color="primary">Abrir</button>
  </mat-card-actions>
</mat-card>

<mat-card class="demo-card demo-card-outlined">
  <mat-card-header>
    <mat-card-title>¿Listo para copiar?</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>Cambiá los tokens de <code>variables.css</code> y todo se actualiza solo.</p>
  </mat-card-content>
  <mat-card-footer class="demo-card-footer">
    <span>MIT License</span>
    <button mat-stroked-button color="primary">Ver código</button>
  </mat-card-footer>
</mat-card>`,
  css: `.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-5);
  width: 100%;
  max-width: 900px;
  margin-inline: auto;
}

.demo-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.demo-card-avatar {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: var(--color-text-inverse);
}

.demo-card-media {
  position: relative;
  display: grid;
  place-items: center;
  height: 110px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: var(--color-text-inverse);
}

.demo-card-outlined {
  border: 1px solid var(--color-border-strong);
  box-shadow: none;
}`,
  ts: `import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './cards.html',
  styleUrls: ['./cards.css'],
})
export class CardsDemo {
  protected readonly favorite = signal(false);

  protected toggleFavorite(): void {
    this.favorite.update((value) => !value);
  }
}`,
};
