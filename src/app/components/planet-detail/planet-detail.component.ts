import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { Planet } from 'src/app/models';
import { PlanetService } from 'src/app/services';
import * as R from 'ramda';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.css']
})
export class PlanetDetailComponent implements OnInit, OnDestroy {

  isLoading = true;
  planet: Planet;

  private onDestroy$ = new Subject<void>();

  constructor(private planetService: PlanetService, private route: ActivatedRoute) {
    const { navigationId, ...oldState } = history.state;
    if (!R.isEmpty(oldState)) {
      this.planet = oldState;
      this.isLoading = false;
    } else {
      this.requestPlanetDetail();
    }
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private requestPlanetDetail() {
    this.route.params
      .pipe(first())
      .subscribe(param => {
        const planetId = param?.id;
        this.planetService.getPlanet(planetId)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(planet => {
            this.planet = planet;
            this.isLoading = false;
          }, err => {
            console.error(err);
            this.isLoading = false;
          });
      }, console.error);
  }

}
