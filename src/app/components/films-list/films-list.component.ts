import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Film, SWAPIResponse } from 'src/app/models';
import { FilmService } from 'src/app/services';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit, OnDestroy {

  films: SWAPIResponse<Film>;
  isLoading = true;

  private onDestroy$ = new Subject<void>();
  constructor(private filmService: FilmService, private router: Router) { }

  ngOnInit(): void {
    this.getAllFilms();
  }

  private getAllFilms() {
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

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
