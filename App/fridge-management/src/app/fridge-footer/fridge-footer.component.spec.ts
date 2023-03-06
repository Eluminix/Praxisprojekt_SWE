import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeFooterComponent } from './fridge-footer.component';

describe('FridgeFooterComponent', () => {
  let component: FridgeFooterComponent;
  let fixture: ComponentFixture<FridgeFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
