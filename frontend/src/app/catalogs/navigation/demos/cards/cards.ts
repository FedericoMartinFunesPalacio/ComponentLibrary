import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { CARDS_CODE } from './cards.code';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [DemoShell, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './cards.html',
  styleUrls: ['./cards.css'],
})
export class CardsDemo {
  protected readonly code = CARDS_CODE;
  protected readonly favorite = signal(false);

  protected toggleFavorite(): void {
    this.favorite.update((value) => !value);
  }
}
