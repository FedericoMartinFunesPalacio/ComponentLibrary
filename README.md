# Component Library

Biblioteca personal de componentes reutilizables en **Angular 20**. Una sola página
muestra todos los componentes ordenados en catálogos, con vista previa funcional y
código listo para copiar y pegar en otros proyectos.

## Stack

| Tecnología        | Uso                                             |
| ----------------- | ----------------------------------------------- |
| Angular 20        | Componentes standalone, control flow `@if`/`@for` |
| Angular Material  | UI (botones, forms, tablas, dialogs, etc.) + `mat-icon` |
| Reactive Forms    | Formularios con lógica en TypeScript            |
| AnimeJs v4        | Animaciones de entrada, drawer, feedback de copiado |
| CSS puro + `variables.css` | Todo el sistema de estilos (sin Tailwind) |

## Ejecutar el proyecto

```bash
cd frontend
npm install
npm start        # http://localhost:4200
```

Otros comandos:

```bash
npm run build    # build de producción (dist/frontend/browser)
npm test         # tests con Karma + ChromeHeadless
```

## Estructura

```
frontend/src/
├── variables.css                  ← TODOS los tokens de estilo (colores, spacing, radius…)
├── styles.css                     ← reset global + estilos de overlays (snackbars)
├── custom-theme.scss              ← tema base de Angular Material
└── app/
    ├── core/
    │   ├── catalog.models.ts      ← interfaces (DemoMeta, CatalogMeta, DemoCode)
    │   └── catalog.data.ts        ← fuente única de verdad: catálogos y demos
    ├── shared/
    │   ├── demo-shell/            ← contenedor estándar: vista previa | código | copiar
    │   └── catalog-section/       ← encabezado de cada catálogo
    ├── pages/catalog-page/        ← layout: toolbar + sidebar + buscador + catálogos
    └── catalogs/
        ├── buttons/               ← Botones e indicadores (4 demos)
        ├── forms/                 ← Formularios reactivos (3 demos)
        ├── tables/                ← Tablas y datos (1 demo)
        ├── feedback/              ← Feedback y diálogos (3 demos)
        └── navigation/            ← Navegación y layout (4 demos)
```

Cada demo sigue el mismo formato:

```
demos/<nombre>/
├── <nombre>.ts          ← componente standalone con la lógica
├── <nombre>.html        ← template (usa @if / @for)
├── <nombre>.css         ← estilos (solo variables de variables.css)
└── <nombre>.code.ts     ← código que se muestra en el panel "código"
```

## Catálogos incluidos (15 demos)

- **Botones e indicadores**: variantes de botón, icon buttons + badges, chips, progreso.
- **Formularios**: inputs con validación, select + autocomplete, datepicker + toggles.
- **Tablas y datos**: tabla con sort, filtro y paginado en español.
- **Feedback y diálogos**: snackbars, diálogo de confirmación reutilizable, alertas.
- **Navegación y layout**: toolbar, tabs, breadcrumbs, cards.

## Cómo agregar un componente

1. Registrá el demo en `src/app/core/catalog.data.ts` (id, título, descripción, tags).
2. Creá la carpeta `src/app/catalogs/<catalogo>/demos/<nombre>/` con `.ts`, `.html`,
   `.css` y `<nombre>.code.ts`.
3. Usá `<app-demo-shell item="id-del-demo" [code]="code">` como contenedor.
4. Importá el componente en el `<catalogo>-catalog.ts` y agregalo al template.
5. Listo: aparece en el sidebar, en el buscador y con scroll-spy automático.

## Estilos: variables.css

Todo el color, spacing, tipografía, sombras, radios y layout vive en
`frontend/src/variables.css`. También incluye los overrides de los tokens de Angular
Material (`--mat-sys-*`), así que cambiando un color ahí se actualiza Material y los
componentes a la vez.

Breakpoints (media queries, se usan como valores fijos):

- `640px` chico · `900px` medio · `1024px` aparece el sidebar fijo · `1200px` grande.

### Temas (claro / oscuro / azul)

Los temas también se definen en `variables.css`, cada uno como un bloque
`[data-theme='...']` que sobreescribe los tokens base:

| Tema    | Bloque                 | Descripción                       |
| ------- | ---------------------- | --------------------------------- |
| Claro   | `:root` (base)         | Blanco, celeste y azul            |
| Oscuro  | `[data-theme='dark']`  | Negro, grises y poco blanco       |
| Azul    | `[data-theme='azul']`  | Azul intenso sobre fondo celeste  |

Cómo funciona:

- El botón con 4 cuadraditos en el topbar (`app-theme-switcher`) abre el menú de
  estilos y cambia el atributo `data-theme` del `<html>`.
- La elección se guarda en `localStorage` (`cl-theme`) y un script chico en
  `index.html` la aplica antes de pintar (sin parpadeo).
- El servicio `frontend/src/app/core/theme.service.ts` lista los temas y aplica
  el activo; los tokens de Material siguen a los `--color-*` automáticamente.

Para agregar un tema nuevo:

1. Crear el bloque `[data-theme='mi-tema'] { ... }` en `variables.css`.
2. Registrarlo en `THEMES` (`core/theme.service.ts`) con `id`, `name`,
   `description` y los 4 colores del `swatch` que verá el botón.

## Deploy en GitHub Pages

El workflow `.github/workflows/deploy.yml` compila el proyecto en cada push a `main`
y publica el resultado en la rama **`deploy`** (carpeta raíz de esa rama).

Pasos la primera vez:

1. Creá el repo en GitHub y pusheá el proyecto.
2. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**
   y elegí rama `deploy` / carpeta `/ (root)`.
3. Push a `main` → el workflow crea (y actualiza) la rama `deploy` con el build.
4. URL resultante:
   `https://<usuario>.github.io/ComponentLibraryByFedericoFunes/`

### URL personalizada (base href)

El `base-href` está definido al tope del workflow:

```yaml
env:
  BASE_HREF: /ComponentLibraryByFedericoFunes/
```

- Si el repositorio se llama **ComponentLibraryByFedericoFunes**, la URL anterior ya
  funciona tal cual.
- Si el repo tiene otro nombre, cambiá ese valor por `/<nombre-del-repo>/`.

### Dominio propio (opcional)

1. Creá el archivo `frontend/public/CNAME` con tu dominio, por ejemplo:

   ```
   componentes.tudominio.com
   ```

2. Configurá en tu DNS del dominio:
   - Registro `A` hacia los IPs de GitHub Pages, o
   - Registro `CNAME` hacia `<usuario>.github.io`.
3. En **Settings → Pages → Custom domain** cargá el mismo dominio y activá
   **Enforce HTTPS**.
4. Al detectar el `CNAME`, el workflow build-ea con `base-href=/`, que es lo correcto
   para dominios personalizados.
5. Esperá la propagación del certificado SSL (puede tardar unos minutos).

## Tests

```bash
cd frontend
npm test
```

`app.spec.ts` verifica que la página renderice los 5 catálogos, los 15 demos, el
sidebar y el filtrado por búsqueda.

## Licencia

MIT — usá y adaptá los componentes libremente.
