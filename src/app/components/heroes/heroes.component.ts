import { Component, OnInit } from '@angular/core';
import { Hero, HeroesService } from 'app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {

  heroes$: Observable<Hero[]>;

  constructor(private heroesService: HeroesService) { 
    this.listHeroes();
  }

  ngOnInit() {
  }

  listHeroes() {
    this.heroes$ = this.heroesService.list();
    // this.heroes$.subscribe(heroes => console.log(heroes));
  }
}
