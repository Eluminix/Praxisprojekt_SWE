import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeProfileComponent } from './fridge-profile.component';

describe('FridgeProfileComponent', () => {
  let component: FridgeProfileComponent;
  let fixture: ComponentFixture<FridgeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
