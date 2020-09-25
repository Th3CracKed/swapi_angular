import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipsDetailComponent } from './starships-detail.component';

describe('StarshipsDetailComponent', () => {
  let component: StarshipsDetailComponent;
  let fixture: ComponentFixture<StarshipsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StarshipsDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
