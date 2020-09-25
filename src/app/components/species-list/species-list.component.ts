import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Species, SWAPIResponse } from 'src/app/models';
import { SpeciesService } from 'src/app/services';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.css']
})
export class SpeciesListComponent implements OnInit, OnDestroy {

  paginationLoading = false;
  searchControl = new FormControl();
  searchLoading = false;
  searchedSpecies: SWAPIResponse<Species>;
  species: SWAPIResponse<Species>;
  isLoading = true;
  private onDestroy$ = new Subject<void>();
  constructor(private speciesService: SpeciesService) { }

  ngOnInit(): void {
    this.getAllSpecies(() => this.isLoading = false);
    this.setupSearch();
  }

  getNextSpecies() {
    this.paginationLoading = true;
    if (this.species?.next) {
      const page = this.species?.next?.split('?page=')[1];
      if (page) { this.getAllSpecies(() => this.paginationLoading = false, page); }
    }
  }

  getPreviousSpecies() {
    if (this.species?.previous) {
      const page = this.species?.previous?.split('?page=')[1];
      if (page) { this.getAllSpecies(() => this.paginationLoading = false, page); }
    }
  }

  private getAllSpecies(onEndCallback: () => void, page?: number) {
    this.speciesService.getAllSpecies(page)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(species => {
        this.species = species;
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
        return value ? this.search(value) : of({ results: [] } as SWAPIResponse<Species>);
      }),
      takeUntil(this.onDestroy$)
    ).subscribe(searchedSpecies => {
      this.searchedSpecies = searchedSpecies;
      this.searchLoading = false;
    }, err => {
      console.error(err);
      this.searchLoading = false;
    });
  }

  private search(value: string): Observable<SWAPIResponse<Species>> {
    const searchedValue = value.trim().toLowerCase(); // SWAPI is case insensitive but it's safer like this
    return this.speciesService.search(searchedValue);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
