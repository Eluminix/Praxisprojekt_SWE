import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeNavigationComponent } from './fridge-navigation.component';

describe('FridgeNavigationComponent', () => {
  let component: FridgeNavigationComponent;
  let fixture: ComponentFixture<FridgeNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
