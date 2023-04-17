import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeProfileComponent } from './fridge-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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

describe('FridgeProfileComponent', () => {
  let component: FridgeProfileComponent;
  let fixture: ComponentFixture<FridgeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule, MatCardModule, MatRadioModule, MatDividerModule, MatSlideToggleModule, FormsModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, BrowserAnimationsModule ],
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
