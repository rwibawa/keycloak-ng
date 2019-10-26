import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments';
import { Hero } from './hero';

const dotaApi = environment.apis.dota;
const heroesApi = `${dotaApi}/v1/dota-heroes`;

type PagedHero = {
  list: Hero[];
  total: number;
};

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  list(): Observable<Hero[]> {
    return this.http
      .get<PagedHero>(heroesApi)
      .pipe(map(({ list }) => list));
  }
}
