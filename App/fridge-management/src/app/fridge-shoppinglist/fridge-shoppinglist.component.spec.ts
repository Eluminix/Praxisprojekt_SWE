import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeShoppinglistComponent } from './fridge-shoppinglist.component';

describe('FridgeShoppinglistComponent', () => {
  let component: FridgeShoppinglistComponent;
  let fixture: ComponentFixture<FridgeShoppinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeShoppinglistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeShoppinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
