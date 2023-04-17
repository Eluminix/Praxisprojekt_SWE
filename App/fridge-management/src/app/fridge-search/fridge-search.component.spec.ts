import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeSearchComponent } from './fridge-search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('FridgeSearchComponent', () => {
  let component: FridgeSearchComponent;
  let fixture: ComponentFixture<FridgeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ FridgeSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
