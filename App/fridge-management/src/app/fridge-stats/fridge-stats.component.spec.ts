import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeStatsComponent } from './fridge-stats.component';

describe('FridgeStatsComponent', () => {
  let component: FridgeStatsComponent;
  let fixture: ComponentFixture<FridgeStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
