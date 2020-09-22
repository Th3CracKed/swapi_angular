import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Film, Films } from 'src/app/models';
import { FilmService } from 'src/app/services';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit, OnDestroy {

  films: Films;
  isLoading = true;

  private onDestroy$ = new Subject<void>();
  constructor(private filmService: FilmService, private router: Router) { }

  ngOnInit(): void {
    this.filmService.getAllFilms()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(films => {
        this.films = films;
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        console.error(err);
      });
  }

  goToDetail(film: Film) {
    const filmId = this.filmService.getFilmId(film);
    this.router.navigate(['films', filmId], { state: film });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
