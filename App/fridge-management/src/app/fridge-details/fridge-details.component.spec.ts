import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeDetailsComponent } from './fridge-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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

describe('FridgeDetailsComponent', () => {
  let component: FridgeDetailsComponent;
  let fixture: ComponentFixture<FridgeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, MatCardModule, MatChipsModule,MatListModule, MatDialogModule, MatExpansionModule, MatIconModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, BrowserAnimationsModule, MatInputModule, MatSelectModule ],
      declarations: [ FridgeDetailsComponent ],
      providers: [ 
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of({ get: () => '1' }) } }]
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
