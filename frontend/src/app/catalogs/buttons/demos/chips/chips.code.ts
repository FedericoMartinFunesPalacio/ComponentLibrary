import { DemoCode } from '../../../../core/catalog.models';

export const CHIPS_CODE: DemoCode = {
  html: `<mat-chip-listbox
  multiple
  [value]="selectedFruits()"
  (change)="onFruitsChange($event)"
  aria-label="Frutas seleccionadas">
  @for (fruit of fruits; track fruit) {
    <mat-chip-option [value]="fruit">{{ fruit }}</mat-chip-option>
  }
</mat-chip-listbox>

<div class="chips-row">
  @for (tag of tags(); track tag) {
    <mat-chip (removed)="removeTag(tag)">
      {{ tag }}
      <button matChipRemove [attr.aria-label]="'Quitar ' + tag">
        <mat-icon>cancel</mat-icon>
      </button>
    </mat-chip>
  }
</div>

<mat-chip-set aria-label="Etiquetas">
  <mat-chip>
    <mat-icon matChipAvatar>label</mat-icon>
    Etiqueta
  </mat-chip>
  <mat-chip>
    <mat-icon matChipAvatar>folder</mat-icon>
    Proyecto
  </mat-chip>
  <mat-chip disabled>
    <mat-icon matChipAvatar>lock</mat-icon>
    Deshabilitado
  </mat-chip>
</mat-chip-set>`,
  css: `.chips-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  width: 100%;
  max-width: 640px;
  margin-inline: auto;
}

.chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}`,
  ts: `import { Component, signal } from '@angular/core';
import { MatChipsModule, MatChipListboxChange } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './chips.html',
  styleUrls: ['./chips.css'],
})
export class ChipsDemo {
  protected readonly fruits = ['Manzana', 'Banana', 'Naranja', 'Uva'];
  protected readonly selectedFruits = signal<string[]>(['Naranja']);
  protected readonly tags = signal(['angular', 'material', 'animejs']);

  protected onFruitsChange(event: MatChipListboxChange): void {
    this.selectedFruits.set(event.value);
  }

  protected removeTag(tag: string): void {
    this.tags.update((current) => current.filter((item) => item !== tag));
  }
}`,
};
