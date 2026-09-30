import { AfterViewInit, Component, Injectable, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { DATA_TABLE_CODE } from './data-table.code';

interface TeamMember {
  id: number;
  nombre: string;
  rol: string;
  equipo: string;
  anios: number;
}

/** Paginador en español. */
@Injectable()
class SpanishPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Filas por página:';
  override nextPageLabel = 'Página siguiente';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';

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
  selector: 'app-data-table',
  standalone: true,
  imports: [
    DemoShell,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: SpanishPaginatorIntl }],
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.css'],
})
export class DataTableDemo implements AfterViewInit {
  protected readonly code = DATA_TABLE_CODE;

  protected readonly displayedColumns = ['nombre', 'rol', 'equipo', 'anios'];

  protected readonly members: TeamMember[] = [
    { id: 1, nombre: 'Ada Lovelace', rol: 'Tech Lead', equipo: 'Plataforma', anios: 6 },
    { id: 2, nombre: 'Grace Hopper', rol: 'Backend', equipo: 'Core API', anios: 4 },
    { id: 3, nombre: 'Linus Torvalds', rol: 'DevOps', equipo: 'Infra', anios: 8 },
    { id: 4, nombre: 'Margaret Hamilton', rol: 'Frontend', equipo: 'Web', anios: 5 },
    { id: 5, nombre: 'Alan Turing', rol: 'Data Engineer', equipo: 'Datos', anios: 3 },
    { id: 6, nombre: 'Katherine Johnson', rol: 'QA', equipo: 'Calidad', anios: 7 },
    { id: 7, nombre: 'Dennis Ritchie', rol: 'Backend', equipo: 'Core API', anios: 9 },
    { id: 8, nombre: 'Barbara Liskov', rol: 'Architect', equipo: 'Plataforma', anios: 10 },
    { id: 9, nombre: 'Guido van Rossum', rol: 'Frontend', equipo: 'Web', anios: 2 },
    { id: 10, nombre: 'James Gosling', rol: 'Backend', equipo: 'Core API', anios: 6 },
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
}
