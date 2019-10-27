import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { HeroesDataSource } from './heroes-datasource';
import { Hero, HeroesService } from 'app/services';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements AfterViewInit, OnInit {
  constructor(private heroesService: HeroesService) { 
  }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Hero>;
  dataSource: HeroesDataSource;

  displayedColumns = ['name', 'attack', 'role', 'legs'];

  ngOnInit() {
    this.dataSource = new HeroesDataSource(this.heroesService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
