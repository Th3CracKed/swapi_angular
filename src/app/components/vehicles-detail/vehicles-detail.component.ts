import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { Vehicles } from 'src/app/models';
import { VehiclesService } from 'src/app/services';
import * as R from 'ramda';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicles-detail',
  templateUrl: './vehicles-detail.component.html',
  styleUrls: ['./vehicles-detail.component.css']
})
export class VehiclesDetailComponent implements OnInit, OnDestroy {

  isLoading = true;
  vehicles: Vehicles;

  private onDestroy$ = new Subject<void>();

  constructor(private vehiclesService: VehiclesService, private route: ActivatedRoute) {
    const { navigationId, ...oldState } = history.state;
    if (!R.isEmpty(oldState)) {
      this.vehicles = oldState;
      this.isLoading = false;
    } else {
      this.requestVehiclesDetail();
    }
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private requestVehiclesDetail() {
    this.route.params
      .pipe(first())
      .subscribe(param => {
        const vehiclesId = param?.id;
        this.vehiclesService.getVehicles(vehiclesId)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(vehicles => {
            this.vehicles = vehicles;
            this.isLoading = false;
          }, err => {
            console.error(err);
            this.isLoading = false;
          });
      }, console.error);
  }

}
