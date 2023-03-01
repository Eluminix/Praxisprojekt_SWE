import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeDetailsComponent } from './fridge-details.component';

describe('FridgeDetailsComponent', () => {
  let component: FridgeDetailsComponent;
  let fixture: ComponentFixture<FridgeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
