import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeAddUnitComponent } from './fridge-add-unit.component';

describe('FridgeAddUnitComponent', () => {
  let component: FridgeAddUnitComponent;
  let fixture: ComponentFixture<FridgeAddUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeAddUnitComponent ]
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
