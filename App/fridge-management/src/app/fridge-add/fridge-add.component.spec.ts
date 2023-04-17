import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeAddComponent } from './fridge-add.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FridgeAddComponent', () => {
  let component: FridgeAddComponent;
  let fixture: ComponentFixture<FridgeAddComponent>;
  
  const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close', 'backdropClick']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [HttpClientModule, MatDividerModule, MatDialogModule, MatGridListModule, MatFormFieldModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, ReactiveFormsModule, MatSelectModule, BrowserAnimationsModule],
      declarations: [ FridgeAddComponent ],
      providers: [ 
        {  provide: MatDialogRef, useValue: matDialogRefSpy  } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
