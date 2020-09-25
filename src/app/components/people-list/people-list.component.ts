import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { People, SWAPIResponse } from 'src/app/models';
import { PeopleService } from 'src/app/services';

@Component({
  selector: 'app-peoples-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit, OnDestroy {

  paginationLoading = false;
  searchControl = new FormControl();
  searchLoading = false;
  searchedCharacters: SWAPIResponse<People>;
  characters: SWAPIResponse<People>;
  isLoading = true;
  private onDestroy$ = new Subject<void>();
  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.getAllCharacters(() => this.isLoading = false);
    this.setupSearch();
  }

  getNextCharacters() {
    this.paginationLoading = true;
    if (this.characters?.next) {
      const page = this.characters?.next?.split('?page=')[1];
      if (page) { this.getAllCharacters(() => this.paginationLoading = false, page); }
    }
  }

  getPreviousCharacters() {
    this.paginationLoading = true;
    if (this.characters?.previous) {
      const page = this.characters?.previous?.split('?page=')[1];
      if (page) { this.getAllCharacters(() => this.paginationLoading = false, page); }
    }
  }


  private getAllCharacters(onEndCallback: () => void, page?: number) {
    this.peopleService.getAllCharacters(page)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(peoples => {
        this.characters = peoples;
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
        return value ? this.search(value) : of({ results: [] } as SWAPIResponse<People>);
      }),
      takeUntil(this.onDestroy$)
    ).subscribe(searchedCharacters => {
      this.searchedCharacters = searchedCharacters;
      this.searchLoading = false;
    }, err => {
      console.error(err);
      this.searchLoading = false;
    });
  }

  private search(value: string): Observable<SWAPIResponse<People>> {
    const searchedValue = value.trim().toLowerCase(); // SWAPI is case insensitive but it's safer like this
    return this.peopleService.search(searchedValue);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
