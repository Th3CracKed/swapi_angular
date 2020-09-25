import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { Species } from 'src/app/models';
import { SpeciesService } from 'src/app/services';
import * as R from 'ramda';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-species-detail',
  templateUrl: './species-detail.component.html',
  styleUrls: ['./species-detail.component.css']
})
export class SpeciesDetailComponent implements OnInit, OnDestroy {

  isLoading = true;
  species: Species;

  private onDestroy$ = new Subject<void>();

  constructor(private speciesService: SpeciesService, private route: ActivatedRoute) {
    const { navigationId, ...oldState } = history.state;
    if (!R.isEmpty(oldState)) {
      this.species = oldState;
      this.isLoading = false;
    } else {
      this.requestSpeciesDetail();
    }
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private requestSpeciesDetail() {
    this.route.params
      .pipe(first())
      .subscribe(param => {
        const speciesId = param?.id;
        this.speciesService.getSpecies(speciesId)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(species => {
            this.species = species;
            this.isLoading = false;
          }, err => {
            console.error(err);
            this.isLoading = false;
          });
      }, console.error);
  }

}
