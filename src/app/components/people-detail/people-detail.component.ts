import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { People } from 'src/app/models';
import { PeopleService } from 'src/app/services';
import * as R from 'ramda';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.css']
})
export class PeopleDetailComponent implements OnInit, OnDestroy {

  isLoading = true;
  people: People;

  private onDestroy$ = new Subject<void>();

  constructor(private peopleService: PeopleService, private route: ActivatedRoute) {
    const { navigationId, ...oldState } = history.state;
    if (!R.isEmpty(oldState)) {
      this.people = oldState;
      this.isLoading = false;
    } else {
      this.requestPeopleDetail();
    }
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private requestPeopleDetail() {
    this.route.params
      .pipe(first())
      .subscribe(param => {
        const peopleId = param?.id;
        this.peopleService.getPeople(peopleId)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(people => {
            this.people = people;
            this.isLoading = false;
          }, err => {
            console.error(err);
            this.isLoading = false;
          });
      }, console.error);
  }

}
