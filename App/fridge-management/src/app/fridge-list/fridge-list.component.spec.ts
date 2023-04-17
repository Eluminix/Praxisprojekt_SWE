import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeListComponent } from './fridge-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { FridgeAlertComponent } from '../fridge-alert/fridge-alert.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('FridgeListComponent', () => {
  let component: FridgeListComponent;
  let fixture: ComponentFixture<FridgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatIconModule, MatGridListModule, MatSnackBarModule],
      declarations: [ FridgeListComponent, FridgeAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
