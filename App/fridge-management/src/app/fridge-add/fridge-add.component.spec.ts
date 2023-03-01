import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeAddComponent } from './fridge-add.component';

describe('FridgeAddComponent', () => {
  let component: FridgeAddComponent;
  let fixture: ComponentFixture<FridgeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeAddComponent ]
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
