import { Component, signal } from '@angular/core';
import { MatChipsModule, MatChipListboxChange } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { CHIPS_CODE } from './chips.code';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [DemoShell, MatChipsModule, MatIconModule],
  templateUrl: './chips.html',
  styleUrls: ['./chips.css'],
})
export class ChipsDemo {
  protected readonly code = CHIPS_CODE;

  protected readonly fruits = ['Manzana', 'Banana', 'Naranja', 'Uva'];
  protected readonly selectedFruits = signal<string[]>(['Naranja']);
  protected readonly tags = signal(['angular', 'material', 'animejs']);

  protected onFruitsChange(event: MatChipListboxChange): void {
    this.selectedFruits.set(event.value);
  }

  protected removeTag(tag: string): void {
    this.tags.update((current) => current.filter((item) => item !== tag));
  }
}
