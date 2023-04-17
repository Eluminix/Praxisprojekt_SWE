import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeAlertComponent } from './fridge-alert.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('FridgeAlertComponent', () => {
  let component: FridgeAlertComponent;
  let fixture: ComponentFixture<FridgeAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
      declarations: [ FridgeAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
