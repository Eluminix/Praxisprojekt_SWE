import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeShoppinglistComponent } from './fridge-shoppinglist.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';


describe('FridgeShoppinglistComponent', () => {
  let component: FridgeShoppinglistComponent;
  let fixture: ComponentFixture<FridgeShoppinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatTableModule],
      declarations: [ FridgeShoppinglistComponent ],
     
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
