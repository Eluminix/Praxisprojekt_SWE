import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeProfileComponent } from './fridge-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FridgeService } from '../fridge.service';
import { of } from 'rxjs';

describe('FridgeProfileComponent', () => {
  let component: FridgeProfileComponent;
  let fixture: ComponentFixture<FridgeProfileComponent>;
  let mockFridgeService: jasmine.SpyObj<FridgeService>;

  beforeEach(async () => {
    mockFridgeService = jasmine.createSpyObj('FridgeService', ['getData', 'updateData', 'deleteData']);
    mockFridgeService.updateData.and.returnValue(of(null));
    mockFridgeService.deleteData.and.returnValue(of(null));
   
    mockFridgeService.getData.and.returnValue(of({
      units: ['kg', 'g', 'oz'],
      capacity: 10,
      measurementSetting: 'metric',
      languageSetting: 'en',
      localizationSetting: 'US',
      autoAddSetting: true,
      alertSetting: true,
      username: 'testuser',
      usermail: 'testuser@mail.com',
      userpassword: 'testpassword'
    }));


    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule, MatCardModule, MatRadioModule, MatDividerModule, MatSlideToggleModule, FormsModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, BrowserAnimationsModule ],
      declarations: [ FridgeProfileComponent ],
      providers: [
        { provide: FridgeService, useValue: mockFridgeService } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve data and update component properties', () => {
    // Act
    component.getData();

    // Assert
    expect(mockFridgeService.getData).toHaveBeenCalled();
    expect(component.units).toEqual(['kg', 'g', 'oz']);
    expect(component.capacity).toBe(10);
    expect(component.measurementSetting).toBe('metric');
    expect(component.languageSetting).toBe('en');
    expect(component.localizationSetting).toBe('US');
    expect(component.autoAddSetting).toBe(true);
    expect(component.alertSetting).toBe(true);
    expect(component.username).toBe('testuser');
    expect(component.usermail).toBe('testuser@mail.com');
    expect(component.userpassword).toBe('testpassword');
  });


  it('should call updateData with new user data', () => {
    const mockUserData = {
      username: 'testuser',
      usermail: 'testuser@test.com',
      userpassword: 'testpassword',
      units: ['Eisfach'],
      capacity: 100,
      measurementSetting: 'ml',
      languageSetting: 'en',
      localizationSetting: 'us',
      autoAddSetting: true,
      alertSetting: true
    };
    component.username = mockUserData.username;
    component.usermail = mockUserData.usermail;
    component.userpassword = mockUserData.userpassword;
    component.units = mockUserData.units;
    component.capacity = mockUserData.capacity;
    component.measurementSetting = mockUserData.measurementSetting;
    component.languageSetting = mockUserData.languageSetting;
    component.localizationSetting = mockUserData.localizationSetting;
    component.autoAddSetting = mockUserData.autoAddSetting;
    component.alertSetting = mockUserData.alertSetting;

    mockFridgeService.updateData.and.returnValue(of(null));

    component.updateProfile();

    expect(mockFridgeService.updateData).toHaveBeenCalledWith(mockUserData);
   
  });


  it('should add unit to units and call updateProfile()', () => {
    // arrange
    const unit = 'ml';

    spyOn(component, 'updateProfile');
    
    // act
    component.addItem(unit);

    // assert
    expect(component.units.length).toBe(4);
    expect(component.units[3]).toBe(unit);
    expect(component.updateProfile).toHaveBeenCalled();
  });


  it('should call fridgeService.deleteData() an delete the unit', () => {
    // arrange
    const unit = 'kg';

    // act
    component.deleteUnit(unit);

    // assert
    expect(component.units.length).toBe(2);
    expect(mockFridgeService.deleteData).toHaveBeenCalledWith(unit);
  });
  


});
