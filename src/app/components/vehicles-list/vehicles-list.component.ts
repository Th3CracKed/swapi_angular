import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Vehicles, SWAPIResponse } from 'src/app/models';
import { VehiclesService } from 'src/app/services';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit, OnDestroy {

  paginationLoading = false;
  searchControl = new FormControl();
  searchLoading = false;
  searchedVehicles: SWAPIResponse<Vehicles>;
  vehicles: SWAPIResponse<Vehicles>;
  isLoading = true;
  private onDestroy$ = new Subject<void>();
  constructor(private vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this.getAllVehicles(() => this.isLoading = false);
    this.setupSearch();
  }

  getNextVehicles() {
    this.paginationLoading = true;
    if (this.vehicles?.next) {
      const page = this.vehicles?.next?.split('?page=')[1];
      if (page) { this.getAllVehicles(() => this.paginationLoading = false, page); }
    }
  }

  getPreviousVehicles() {
    if (this.vehicles?.previous) {
      const page = this.vehicles?.previous?.split('?page=')[1];
      if (page) { this.getAllVehicles(() => this.paginationLoading = false, page); }
    }
  }

  private getAllVehicles(onEndCallback: () => void, page?: number) {
    this.vehiclesService.getAllVehicles(page)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(vehicles => {
        this.vehicles = vehicles;
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
        return value ? this.search(value) : of({ results: [] } as SWAPIResponse<Vehicles>);
      }),
      takeUntil(this.onDestroy$)
    ).subscribe(searchedVehicles => {
      this.searchedVehicles = searchedVehicles;
      this.searchLoading = false;
    }, err => {
      console.error(err);
      this.searchLoading = false;
    });
  }

  private search(value: string): Observable<SWAPIResponse<Vehicles>> {
    const searchedValue = value.trim().toLowerCase(); // SWAPI is case insensitive but it's safer like this
    return this.vehiclesService.search(searchedValue);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
