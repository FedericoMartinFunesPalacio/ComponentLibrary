export interface DemoMeta {
  /** Ancla única del demo dentro de la página (id del elemento). */
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface CatalogMeta {
  id: string;
  title: string;
  icon: string;
  summary: string;
  demos: DemoMeta[];
}

export interface DemoNavItem extends DemoMeta {
  catalogId: string;
  catalogTitle: string;
  icon: string;
}

/** Código fuente que se muestra/copía en cada demo. */
export interface DemoCode {
  html?: string;
  css?: string;
  ts?: string;
}
