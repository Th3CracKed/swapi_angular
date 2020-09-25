import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Planet, SWAPIResponse } from 'src/app/models';
import { PlanetService } from 'src/app/services';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.css']
})
export class PlanetsListComponent implements OnInit, OnDestroy {

  paginationLoading = false;
  searchControl = new FormControl();
  searchLoading = false;
  searchedPlanets: SWAPIResponse<Planet>;
  planets: SWAPIResponse<Planet>;
  isLoading = true;
  private onDestroy$ = new Subject<void>();
  constructor(private planetService: PlanetService) { }

  ngOnInit(): void {
    this.getAllPlanets(() => this.isLoading = false);
    this.setupSearch();
  }

  getNextPlanets() {
    this.paginationLoading = true;
    if (this.planets?.next) {
      const page = this.planets?.next?.split('?page=')[1];
      if (page) { this.getAllPlanets(() => this.paginationLoading = false, page); }
    }
  }

  getPreviousPlanets() {
    if (this.planets?.previous) {
      const page = this.planets?.previous?.split('?page=')[1];
      if (page) { this.getAllPlanets(() => this.paginationLoading = false, page); }
    }
  }


  private getAllPlanets(onEndCallback: () => void, page?: number) {
    this.planetService.getAllPlanets(page)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(planets => {
        this.planets = planets;
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
        return value ? this.search(value) : of({ results: [] } as SWAPIResponse<Planet>);
      }),
      takeUntil(this.onDestroy$)
    ).subscribe(searchedPlanets => {
      this.searchedPlanets = searchedPlanets;
      this.searchLoading = false;
    }, err => {
      console.error(err);
      this.searchLoading = false;
    });
  }

  private search(value: string): Observable<SWAPIResponse<Planet>> {
    const searchedValue = value.trim().toLowerCase(); // SWAPI is case insensitive but it's safer like this
    return this.planetService.search(searchedValue);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
