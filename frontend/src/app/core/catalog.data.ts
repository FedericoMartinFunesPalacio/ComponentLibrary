import { CatalogMeta, DemoCode, DemoMeta, DemoNavItem } from './catalog.models';

export const CATALOGS: CatalogMeta[] = [
  {
    id: 'buttons',
    title: 'Botones e indicadores',
    icon: 'smart_button',
    summary: 'Botones, chips, badges y indicadores de progreso.',
    demos: [
      {
        id: 'button-variants',
        title: 'Variantes de botón',
        description:
          'Todas las variantes de Angular Material: texto, plano, elevado, contorneado, FAB y botón de icono.',
        tags: ['mat-button', 'mat-raised-button', 'mat-fab'],
      },
      {
        id: 'icon-buttons',
        title: 'Botones de icono y badges',
        description: 'Botones circulares con icono y badges superpuestos con contador.',
        tags: ['mat-icon-button', 'mat-badge', 'mat-icon'],
      },
      {
        id: 'chips',
        title: 'Chips',
        description: 'Chips seleccionables, con avatar y removibles para filtros y etiquetas.',
        tags: ['mat-chip-listbox', 'mat-chip'],
      },
      {
        id: 'progress-indicators',
        title: 'Progreso y carga',
        description: 'Barra de progreso determinada/indeterminada y spinner circular.',
        tags: ['mat-progress-bar', 'mat-spinner'],
      },
    ],
  },
  {
    id: 'forms',
    title: 'Formularios',
    icon: 'edit_note',
    summary: 'Formularios reactivos con validaciones en TypeScript.',
    demos: [
      {
        id: 'reactive-text-inputs',
        title: 'Inputs con validación',
        description:
          'Formulario reactivo con nombre, email y contraseña: validaciones, estados de error y envío bloqueado.',
        tags: ['ReactiveFormsModule', 'Validators'],
      },
      {
        id: 'select-autocomplete',
        title: 'Select y autocompletado',
        description: 'Select material y autocomplete filtrado con signals en tiempo real.',
        tags: ['mat-select', 'mat-autocomplete'],
      },
      {
        id: 'date-and-toggles',
        title: 'Fecha y toggles',
        description: 'Datepicker, checkbox, radios y switch agrupados en un FormGroup.',
        tags: ['mat-datepicker', 'mat-checkbox', 'mat-radio'],
      },
    ],
  },
  {
    id: 'tables',
    title: 'Tablas y datos',
    icon: 'table_chart',
    summary: 'Tabla Material con orden, paginado y filtro.',
    demos: [
      {
        id: 'data-table',
        title: 'Tabla con sort, filtro y paginado',
        description:
          'Tabla completa con MatTable, ordenamiento, búsqueda global y paginación en español.',
        tags: ['mat-table', 'mat-sort', 'mat-paginator'],
      },
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback y diálogos',
    icon: 'notifications_active',
    summary: 'Snackbars, modales y alertas para comunicar al usuario.',
    demos: [
      {
        id: 'snackbars',
        title: 'Snackbars (toasts)',
        description: 'Notificaciones flotantes con acción deshacer y auto-cierre.',
        tags: ['MatSnackBar'],
      },
      {
        id: 'dialogs',
        title: 'Diálogos y confirmaciones',
        description: 'Modal con datos y diálogo de confirmación que devuelve el resultado.',
        tags: ['MatDialog'],
      },
      {
        id: 'alerts',
        title: 'Alertas y banners',
        description: 'Mensajes inline de éxito, información, advertencia y error.',
        tags: ['CSS', 'tokens'],
      },
    ],
  },
  {
    id: 'navigation',
    title: 'Navegación y layout',
    icon: 'view_quilt',
    summary: 'Toolbars, tabs, breadcrumbs y cards.',
    demos: [
      {
        id: 'toolbar',
        title: 'Toolbar',
        description: 'Barra superior con marca, acciones e iconos.',
        tags: ['mat-toolbar'],
      },
      {
        id: 'tabs',
        title: 'Tabs',
        description: 'Pestañas con contenido, iconos y animación de indicador.',
        tags: ['mat-tab-group'],
      },
      {
        id: 'breadcrumbs',
        title: 'Breadcrumbs',
        description: 'Ruta de navegación con separadores y estados activos.',
        tags: ['nav', 'aria'],
      },
      {
        id: 'cards',
        title: 'Cards',
        description: 'Tarjetas con header, media, contenido y acciones.',
        tags: ['mat-card'],
      },
    ],
  },
];

export const ALL_DEMOS: DemoNavItem[] = CATALOGS.flatMap((catalog) =>
  catalog.demos.map((demo) => ({
    ...demo,
    catalogId: catalog.id,
    catalogTitle: catalog.title,
    icon: catalog.icon,
  }))
);

export const TOTAL_DEMOS = ALL_DEMOS.length;

export function getDemoMeta(id: string): DemoMeta {
  const demo = ALL_DEMOS.find((item) => item.id === id);
  if (!demo) {
    throw new Error(`No existe el demo "${id}" en catalog-data.ts`);
  }
  return demo;
}

export function searchDemos(query: string): DemoNavItem[] {
  const term = query.trim().toLowerCase();
  if (!term) {
    return ALL_DEMOS;
  }
  return ALL_DEMOS.filter((demo) =>
    [demo.title, demo.description, demo.catalogTitle, ...demo.tags]
      .join(' ')
      .toLowerCase()
      .includes(term)
  );
}

export const EMPTY_CODE: DemoCode = {};
