import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeplacementsComponent } from './deplacements.component';

describe('DeplacementsComponent', () => {
  let component: DeplacementsComponent;
  let fixture: ComponentFixture<DeplacementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeplacementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeplacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
