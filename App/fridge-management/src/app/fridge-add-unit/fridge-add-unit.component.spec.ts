import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


import { FridgeAddUnitComponent } from './fridge-add-unit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FridgeAddUnitComponent', () => {
  let component: FridgeAddUnitComponent;
  let fixture: ComponentFixture<FridgeAddUnitComponent>;
  const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close', 'backdropClick']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule, FormsModule, MatDialogModule, MatInputModule, BrowserAnimationsModule
      ],
            declarations: [ FridgeAddUnitComponent ],
            providers: [ 
              { provide: ActivatedRoute, useValue: { snapshot: {} } },
              { provide: MatDialogRef, useValue: matDialogRefSpy } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeAddUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
