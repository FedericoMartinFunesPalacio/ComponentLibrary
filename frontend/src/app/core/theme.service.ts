import { Injectable, signal } from '@angular/core';

export interface Theme {
  id: string;
  name: string;
  description: string;
  /** 4 colores representativos que ve el usuario en el botón. */
  swatch: [string, string, string, string];
}

export const THEMES: Theme[] = [
  {
    id: 'light',
    name: 'Claro',
    description: 'Blanco, celeste y azul',
    swatch: ['#ffffff', '#e0f2fe', '#38bdf8', '#4f46e5'],
  },
  {
    id: 'dark',
    name: 'Oscuro',
    description: 'Negro, grises y poco blanco',
    swatch: ['#0a0a0c', '#26262c', '#6f7480', '#e9eaed'],
  },
  {
    id: 'azul',
    name: 'Azul',
    description: 'Azul intenso sobre fondo celeste',
    swatch: ['#ffffff', '#dbeafe', '#2563eb', '#1e3a8a'],
  },
];

const STORAGE_KEY = 'cl-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themes = THEMES;
  readonly current = signal<string>(this.readStored());

  constructor() {
    this.apply(this.current());
  }

  select(id: string): void {
    if (!THEMES.some((theme) => theme.id === id) || id === this.current()) {
      return;
    }
    this.current.set(id);
    this.apply(id);
  }

  private readStored(): string {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return THEMES.some((theme) => theme.id === stored) ? stored! : 'light';
    } catch {
      return 'light';
    }
  }

  private apply(id: string): void {
    document.documentElement.setAttribute('data-theme', id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* almacenamiento no disponible */
    }
  }
}
