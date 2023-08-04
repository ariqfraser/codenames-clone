import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplodingCardComponent } from './exploding-card.component';

describe('ExplodingCardComponent', () => {
  let component: ExplodingCardComponent;
  let fixture: ComponentFixture<ExplodingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplodingCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplodingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
