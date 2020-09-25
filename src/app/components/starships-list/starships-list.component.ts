import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Starships, SWAPIResponse } from 'src/app/models';
import { StarshipsService } from 'src/app/services';

@Component({
  selector: 'app-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.css']
})
export class StarshipsListComponent implements OnInit, OnDestroy {

  paginationLoading = false;
  searchControl = new FormControl();
  searchLoading = false;
  searchedStarships: SWAPIResponse<Starships>;
  starships: SWAPIResponse<Starships>;
  isLoading = true;
  private onDestroy$ = new Subject<void>();
  constructor(private starshipsService: StarshipsService) { }

  ngOnInit(): void {
    this.getAllStarships(() => this.isLoading = false);
    this.setupSearch();
  }

  getNextStarships() {
    this.paginationLoading = true;
    if (this.starships?.next) {
      const page = this.starships?.next?.split('?page=')[1];
      if (page) { this.getAllStarships(() => this.paginationLoading = false, page); }
    }
  }

  getPreviousStarships() {
    if (this.starships?.previous) {
      const page = this.starships?.previous?.split('?page=')[1];
      if (page) { this.getAllStarships(() => this.paginationLoading = false, page); }
    }
  }

  private getAllStarships(onEndCallback: () => void, page?: number) {
    this.starshipsService.getAllStarships(page)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(starships => {
        this.starships = starships;
        onEndCallback();
      }, err => {
        onEndCallback();
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
        return value ? this.search(value) : of({ results: [] } as SWAPIResponse<Starships>);
      }),
      takeUntil(this.onDestroy$)
    ).subscribe(searchedStarships => {
      this.searchedStarships = searchedStarships;
      this.searchLoading = false;
    }, err => {
      console.error(err);
      this.searchLoading = false;
    });
  }

  private search(value: string): Observable<SWAPIResponse<Starships>> {
    const searchedValue = value.trim().toLowerCase(); // SWAPI is case insensitive but it's safer like this
    return this.starshipsService.search(searchedValue);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
