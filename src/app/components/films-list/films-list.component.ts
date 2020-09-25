import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Film, SWAPIResponse } from 'src/app/models';
import { FilmService } from 'src/app/services';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit, OnDestroy {

  searchControl = new FormControl();
  searchLoading = false;
  searchedFilms: SWAPIResponse<Film>;
  films: SWAPIResponse<Film>;
  isLoading = true;
  private onDestroy$ = new Subject<void>();
  constructor(private filmService: FilmService, private router: Router) { }

  ngOnInit(): void {
    this.getAllFilms();
    this.setupSearch();
  }

  getNextFilms() {
    if (this.films?.next) {
      const page = this.films?.next?.split('?')[1];
      if (page) { this.getAllFilms(page); }
    }
  }

  getPreviousFilms() {
    if (this.films?.previous) {
      const page = this.films?.previous?.split('?')[1];
      if (page) { this.getAllFilms(page); }
    }
  }


  private getAllFilms(page?: number) {
    this.filmService.getAllFilms(page)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(films => {
        this.films = films;
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        console.error(err);
      });
  }

  private setupSearch() {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(), // Only emit when the current search value is different than the last.
      debounceTime(200), // Discard emitted values that take less than the specified time between output
      switchMap(value => { // switchMap switch to a new observable when new Request is done
        this.searchLoading = true;
        return value ? this.search(value) : of({ results: [] } as SWAPIResponse<Film>);
      }),
      takeUntil(this.onDestroy$)
    ).subscribe(searchedFilms => {
      this.searchedFilms = searchedFilms;
      this.searchLoading = false;
    }, err => {
      console.error(err);
      this.searchLoading = false;
    });
  }

  private search(value: string): Observable<SWAPIResponse<Film>> {
    const searchedValue = value.trim().toLowerCase(); // SWAPI is case insensitive but it's safer like this
    return this.filmService.search(searchedValue);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
