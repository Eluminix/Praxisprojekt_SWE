import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeEditComponent } from './fridge-edit.component';

describe('FridgeEditComponent', () => {
  let component: FridgeEditComponent;
  let fixture: ComponentFixture<FridgeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
