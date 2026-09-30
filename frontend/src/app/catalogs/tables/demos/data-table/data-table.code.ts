import { DemoCode } from '../../../../core/catalog.models';

export const DATA_TABLE_CODE: DemoCode = {
  html: `<mat-form-field appearance="outline" subscriptSizing="dynamic">
  <mat-label>Buscar</mat-label>
  <input matInput [formControl]="filterCtrl" placeholder="Nombre, rol o equipo..." />
  <mat-icon matPrefix>search</mat-icon>
</mat-form-field>

<table mat-table [dataSource]="dataSource" matSort>
  <ng-container matColumnDef="nombre">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombre</th>
    <td mat-cell *matCellDef="let row">{{ row.nombre }}</td>
  </ng-container>

  <ng-container matColumnDef="rol">
    <th mat-header-cell *matHeaderCellDef>Rol</th>
    <td mat-cell *matCellDef="let row">{{ row.rol }}</td>
  </ng-container>

  <ng-container matColumnDef="equipo">
    <th mat-header-cell *matHeaderCellDef>Equipo</th>
    <td mat-cell *matCellDef="let row">{{ row.equipo }}</td>
  </ng-container>

  <ng-container matColumnDef="anios">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Años</th>
    <td mat-cell *matCellDef="let row">{{ row.anios }}</td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>

  <tr class="mat-row" *matNoDataRow>
    <td class="mat-cell" [colSpan]="displayedColumns.length">
      Sin resultados para “{{ filterCtrl.value }}”.
    </td>
  </tr>
</table>

<mat-paginator [pageSizeOptions]="[5, 10]" showFirstLastButtons></mat-paginator>`,
  css: `.table-card {
  width: 100%;
  max-width: 860px;
  margin-inline: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-wrap {
  overflow-x: auto;
}

.table-chip {
  display: inline-block;
  padding: 2px var(--space-2);
  border-radius: var(--radius-full);
  background: var(--color-primary-container);
  color: var(--color-on-primary-container);
  font-size: var(--font-size-xs);
}`,
  ts: `import { AfterViewInit, Component, Injectable, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface TeamMember {
  id: number;
  nombre: string;
  rol: string;
  equipo: string;
  anios: number;
}

@Injectable()
class SpanishPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Filas por página:';
  override nextPageLabel = 'Página siguiente';
  override previousPageLabel = 'Página anterior';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0) {
      return '0 de 0';
    }
    const from = page * pageSize + 1;
    const to = Math.min((page + 1) * pageSize, length);
    return from + '-' + to + ' de ' + length;
  };
}

@Component({
  selector: 'app-team-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: SpanishPaginatorIntl }],
  templateUrl: './team-table.html',
  styleUrls: ['./team-table.css'],
})
export class TeamTable implements AfterViewInit {
  protected readonly displayedColumns = ['nombre', 'rol', 'equipo', 'anios'];

  protected readonly members: TeamMember[] = [
    { id: 1, nombre: 'Ada Lovelace', rol: 'Tech Lead', equipo: 'Plataforma', anios: 6 },
    { id: 2, nombre: 'Grace Hopper', rol: 'Backend', equipo: 'Core API', anios: 4 },
    { id: 3, nombre: 'Linus Torvalds', rol: 'DevOps', equipo: 'Infra', anios: 8 },
    { id: 4, nombre: 'Margaret Hamilton', rol: 'Frontend', equipo: 'Web', anios: 5 },
  ];

  protected readonly dataSource = new MatTableDataSource<TeamMember>(this.members);
  protected readonly filterCtrl = new FormControl('', { nonNullable: true });

  @ViewChild(MatSort) private sort?: MatSort;
  @ViewChild(MatPaginator) private paginator?: MatPaginator;

  constructor() {
    this.filterCtrl.valueChanges.subscribe((value) => {
      this.dataSource.filter = value.trim().toLowerCase();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort ?? null;
    this.dataSource.paginator = this.paginator ?? null;
  }
}`,
};
