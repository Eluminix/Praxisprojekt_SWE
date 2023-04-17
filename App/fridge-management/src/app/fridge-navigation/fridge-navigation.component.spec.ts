import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeNavigationComponent } from './fridge-navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FridgeFooterComponent } from '../fridge-footer/fridge-footer.component';

describe('FridgeNavigationComponent', () => {
  let component: FridgeNavigationComponent;
  let fixture: ComponentFixture<FridgeNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSidenavModule, BrowserAnimationsModule, MatToolbarModule, MatListModule, MatIconModule, RouterModule],
      declarations: [ FridgeNavigationComponent, FridgeFooterComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
