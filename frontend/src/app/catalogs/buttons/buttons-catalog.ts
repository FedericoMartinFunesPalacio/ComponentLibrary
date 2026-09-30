import { Component } from '@angular/core';

import { CatalogSection } from '../../shared/catalog-section/catalog-section';
import { ButtonVariantsDemo } from './demos/button-variants/button-variants';
import { IconButtonsDemo } from './demos/icon-buttons/icon-buttons';
import { ChipsDemo } from './demos/chips/chips';
import { ProgressIndicatorsDemo } from './demos/progress-indicators/progress-indicators';

@Component({
  selector: 'app-buttons-catalog',
  standalone: true,
  imports: [
    CatalogSection,
    ButtonVariantsDemo,
    IconButtonsDemo,
    ChipsDemo,
    ProgressIndicatorsDemo,
  ],
  templateUrl: './buttons-catalog.html',
})
export class ButtonsCatalog {}
