import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImageDetailComponent } from './car-image-detail.component';

describe('CarImageDetailComponent', () => {
  let component: CarImageDetailComponent;
  let fixture: ComponentFixture<CarImageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarImageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarImageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
