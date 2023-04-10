import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FridgeService } from '../fridge.service';
import { Observable } from 'rxjs';
import { FridgeItem } from '../fridge-item.model';

@Component({
  selector: 'app-fridge-alert',
  templateUrl: './fridge-alert.component.html',
  styleUrls: ['./fridge-alert.component.scss']
})
export class FridgeAlertComponent {

  fridgeItems: FridgeItem[] = []
  

  
  
  constructor(
    private fridgeService: FridgeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fridgeService.getItemsData().subscribe((data: any) => {
      this.fridgeItems= data;
        const expiringItems = this.fridgeItems.filter((item) => {
          const daysUntilExpiration = this.fridgeService.getDaysUntilExpiration(item);
          const isLowOnQuantity = this.fridgeService.isLowOnQuantity(item);
          return daysUntilExpiration <= 3 || isLowOnQuantity;
        });

        if (expiringItems.length > 0) {
          const message = `Folgende Artikel sollten beachtet werden: ${expiringItems
            .map((item) => item.name)
            .join(', ')}`;
          this.snackBar.open(message, '', { duration: 5000, panelClass: ['warn-snackbar'] });
        }
    });

  }
}
