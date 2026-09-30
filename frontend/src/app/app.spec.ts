import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { CatalogPage } from './pages/catalog-page/catalog-page';

describe('CatalogPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogPage],
      providers: [provideNoopAnimations()],
    }).compileComponents();
  });

  it('debe crear la página del catálogo', () => {
    const fixture = TestBed.createComponent(CatalogPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe renderizar los 5 catálogos y sus demos', () => {
    const fixture = TestBed.createComponent(CatalogPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.catalog-section').length).toBe(5);
    expect(element.querySelectorAll('.demo-block').length).toBe(15);
    expect(element.querySelectorAll('.side-link').length).toBe(15);
  });

  it('debe filtrar los componentes con el buscador', () => {
    const fixture = TestBed.createComponent(CatalogPage);
    fixture.detectChanges();

    const input = (fixture.nativeElement as HTMLElement).querySelector(
      '.side-search-input'
    ) as HTMLInputElement;
    input.value = 'tabla';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const links = element.querySelectorAll('.side-link');
    expect(links.length).toBe(1);
    expect(links[0].textContent).toContain('Tabla con sort');
  });

  it('debe cambiar de estilo con el botón de temas', () => {
    const fixture = TestBed.createComponent(CatalogPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLElement>('.theme-trigger')?.click();
    fixture.detectChanges();

    const options = element.querySelectorAll<HTMLElement>('.theme-option');
    expect(options.length).toBe(3);

    const dark = Array.from(options).find((option) =>
      option.textContent?.includes('Oscuro')
    );
    dark?.click();
    fixture.detectChanges();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('cl-theme')).toBe('dark');
    expect(element.querySelector('.theme-menu')).toBeNull();

    // Restaura el tema por defecto para los siguientes tests.
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.removeItem('cl-theme');
  });
});
