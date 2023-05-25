import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeListComponent } from './fridge-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { FridgeAlertComponent } from '../fridge-alert/fridge-alert.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FridgeService } from '../fridge.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FridgeAddComponent } from '../fridge-add/fridge-add.component';
import { MatDividerModule } from '@angular/material/divider';

describe('FridgeListComponent', () => {
  let component: FridgeListComponent;
  let fixture: ComponentFixture<FridgeListComponent>;
  let mockFridgeService: jasmine.SpyObj<FridgeService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  const mockFridgeItems = [
    { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  },
    { id: 2, name: 'Eier', quantity: 6, expiryDate: new Date(2023, 4, 2), category: "Eier", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  },
  ];



  beforeEach(async () => {
    mockFridgeService = jasmine.createSpyObj('FridgeService', ['getItemsData', 'addItem', 'deleteItem']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockFridgeService.getItemsData.and.returnValue(of(mockFridgeItems));
    mockFridgeService.addItem.and.returnValue(of(null));
    mockFridgeService.deleteItem.and.returnValue(of(null));
  
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatIconModule, MatGridListModule, MatSnackBarModule, MatCardModule, RouterTestingModule, MatDividerModule],
      declarations: [ FridgeListComponent, FridgeAlertComponent ],
      
      providers: [ { provide: FridgeService, useValue: mockFridgeService  } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should fetch fridge items on init', () => {
    component.getItemsData();
    expect(mockFridgeService.getItemsData).toHaveBeenCalled();
    expect(component.fridgeItems).toEqual(mockFridgeItems);
    expect(component.dataSource.data).toEqual(mockFridgeItems);
  });

  it('should call FridgeService.addItem and add new item', () => {
    const mockData = {name: 'Test Item', quantity: 1, date: new Date(), category: 'Test', notes: '', amount: 0, kcal: 0, sugar: 0, fat: 0, protein: 0, carbs: 0 };
    component.newItemId = 3;
    component.addItem(mockData);
    expect(mockFridgeService.addItem).toHaveBeenCalledWith({
      id: 3,
      name: 'Test Item',
      quantity: 1,
      expiryDate: mockData.date,
      category: 'Test',
      notes: '',
      amount: 0,
      kcal: 0,
      sugar: 0,
      fat: 0,
      protein: 0,
      carbs: 0
    });
  
  });

  it('should delete item and update list', () => {
    const mockId = 1;
    component.fridgeItems = mockFridgeItems;
    component.dataSource.data = mockFridgeItems;
  
    component.deleteItem(mockId);
    console.log(component.fridgeItems.length)
   
    expect(mockFridgeService.deleteItem).toHaveBeenCalledWith(mockId);
    expect(component.fridgeItems.some(item => item.id === mockId)).toBe(false);
    expect(component.dataSource.data.some(item => item.id === mockId)).toBe(false);
  });




  it('should open the add dialog and update items data', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpy);
    const updateItemsDataSpy = spyOn(component, 'addItem');
  
    component.openAddItemDialog();
  
    expect(dialogSpy).toHaveBeenCalledWith(FridgeAddComponent);
    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();
    expect(updateItemsDataSpy).toHaveBeenCalledWith(true);
  });
 




});
