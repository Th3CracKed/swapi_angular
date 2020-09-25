import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { Starships } from 'src/app/models';
import { StarshipsService } from 'src/app/services';
import * as R from 'ramda';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-starships-detail',
  templateUrl: './starships-detail.component.html',
  styleUrls: ['./starships-detail.component.css']
})
export class StarshipsDetailComponent implements OnInit, OnDestroy {

  isLoading = true;
  starships: Starships;

  private onDestroy$ = new Subject<void>();

  constructor(private starshipsService: StarshipsService, private route: ActivatedRoute) {
    const { navigationId, ...oldState } = history.state;
    if (!R.isEmpty(oldState)) {
      this.starships = oldState;
      this.isLoading = false;
    } else {
      this.requestStarshipsDetail();
    }
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private requestStarshipsDetail() {
    this.route.params
      .pipe(first())
      .subscribe(param => {
        const starshipsId = param?.id;
        this.starshipsService.getStarships(starshipsId)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(starships => {
            this.starships = starships;
            this.isLoading = false;
          }, err => {
            console.error(err);
            this.isLoading = false;
          });
      }, console.error);
  }

}
