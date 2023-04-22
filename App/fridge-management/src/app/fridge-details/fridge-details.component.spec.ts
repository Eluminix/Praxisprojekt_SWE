import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeDetailsComponent } from './fridge-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FridgeService } from '../fridge.service';
import { FridgeItem } from '../fridge-item.model';

describe('FridgeDetailsComponent', () => {
  let component: FridgeDetailsComponent;
  let fixture: ComponentFixture<FridgeDetailsComponent>;
  let snackBar: MatSnackBar;
  let mockFridgeService: jasmine.SpyObj<FridgeService>;

  beforeEach(async () => {
    mockFridgeService = jasmine.createSpyObj('FridgeService', ['updateItem']);
    mockFridgeService.updateItem.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, MatCardModule, MatChipsModule,MatListModule, MatDialogModule, MatExpansionModule, MatIconModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, BrowserAnimationsModule, MatInputModule, MatSelectModule ],
      declarations: [ FridgeDetailsComponent ],
      providers: [ 
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of({ get: () => '1' }) } },
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy() } },
        { provide: FridgeService, useValue: mockFridgeService  }
      ]
        
    
    })
    .compileComponents();

    snackBar = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(FridgeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call MatSnackBar.open', () => {
    const message = 'test message';
    const action = 'test action';
    component.openSnackBar(message, action);
    expect(snackBar.open).toHaveBeenCalledWith(message, action, { duration: 2000 });
  });


  it('should update item details and call updateItem() when Enter key is pressed', () => {
    // Arrange
    const mockEvent = { keyCode: 13 };
    const mockItem: FridgeItem = { 
      id: 1, 
      name: 'Mock Item', 
      quantity: 1, 
      expiryDate: new Date(),
      notes: 'Mock Notes', 
      category: 'Mock Category', 
      amount: 1, 
      kcal: 100, 
      sugar: 10, 
      fat: 5, 
      protein: 20, 
      carbs: 15 
    };
  
  
   
    // Act
    component.item = mockItem;
    component.quantityValue = 2;
    component.dateValue = new Date('2023-04-30');
    component.nameValue = 'Updated Mock Item';
    component.notesValue = 'Updated Mock Notes';
    component.amountValue = 2;
    component.kcalValue = 200;
    component.sugarValue = 20;
    component.fatValue = 10;
    component.proteinValue = 40;
    component.carbsValue = 30;
    component.updateFridgeItemDetailsWithEnter(mockEvent);

    
  
    // Assert
    expect(component.item.quantity).toBe(2);
    expect(component.item.expiryDate).toEqual(new Date('2023-04-30'));
    expect(component.item.name).toBe('Updated Mock Item');
    expect(component.item.notes).toBe('Updated Mock Notes');
    expect(component.item.amount).toBe(2);
    expect(component.item.kcal).toBe(200);
    expect(component.item.sugar).toBe(20);
    expect(component.item.fat).toBe(10);
    expect(component.item.protein).toBe(40);
    expect(component.item.carbs).toBe(30);
    expect(mockFridgeService.updateItem).toHaveBeenCalled();
  });
});
