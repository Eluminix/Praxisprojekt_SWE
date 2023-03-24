import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FridgeListComponent } from './fridge-list/fridge-list.component';
import { FridgeDetailsComponent } from './fridge-details/fridge-details.component';
import { FridgeSearchComponent } from './fridge-search/fridge-search.component';
import { FridgeAlertComponent } from './fridge-alert/fridge-alert.component';
import { FridgeStatsComponent } from './fridge-stats/fridge-stats.component';
import { FridgeAddComponent } from './fridge-add/fridge-add.component';
import { FridgeEditComponent } from './fridge-edit/fridge-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { FridgeComponent } from './fridge/fridge.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FridgeShoppinglistComponent } from './fridge-shoppinglist/fridge-shoppinglist.component';
import { FridgeNavigationComponent } from './fridge-navigation/fridge-navigation.component';
import { FridgeProfileComponent } from './fridge-profile/fridge-profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FridgeFooterComponent } from './fridge-footer/fridge-footer.component';
import {MatMenuModule} from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import {MatDatepickerModule, MatSingleDateSelectionModel} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FridgeAddUnitComponent } from './fridge-add-unit/fridge-add-unit.component';


@NgModule({
  declarations: [
    AppComponent,
    FridgeListComponent,
    FridgeDetailsComponent,
    FridgeSearchComponent,
    FridgeAlertComponent,
    FridgeStatsComponent,
    FridgeAddComponent,
    FridgeEditComponent,
    FridgeComponent,
    FridgeShoppinglistComponent,
    FridgeNavigationComponent,
    FridgeProfileComponent,
    FridgeFooterComponent,
    FridgeAddUnitComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    LayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 


}
