import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Film } from 'src/app/models';
import { FilmService } from 'src/app/services';
import * as R from 'ramda';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit, OnDestroy {

  isLoading = true;
  film: Film;

  private onDestroy$ = new Subject<void>();

  constructor(private filmService: FilmService) {
    const { navigationId, ...oldState } = history.state;
    if (!R.isEmpty(oldState)) {
      this.film = oldState;
      this.isLoading = false;
    } else {
      this.requestFilmDetail(navigationId);
    }
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private requestFilmDetail(filmId: string) {
    this.filmService.getFilm(filmId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(film => {
        this.film = film;
        this.isLoading = false;
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

}
