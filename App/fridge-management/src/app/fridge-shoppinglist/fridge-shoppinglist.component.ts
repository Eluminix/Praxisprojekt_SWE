import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';
import { FridgeAddComponent } from '../fridge-add/fridge-add.component';
import { FridgeItem } from '../fridge-item.model';
import { FridgeService } from '../fridge.service';

@Component({
  selector: 'app-fridge-shoppinglist',
  templateUrl: './fridge-shoppinglist.component.html',
  styleUrls: ['./fridge-shoppinglist.component.scss']
})
export class FridgeShoppinglistComponent {
 
  fridgeItems: FridgeItem[] = [];
  shoppinglistItems: FridgeItem[] = [];
  lowQuantityItems: FridgeItem[] = [];
  soonToExpireItems: FridgeItem[] = [];
  newFridgeItem: FridgeItem = { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  };
  newItemId: number = 0;
  lowQuantityDataSource = new MatTableDataSource<FridgeItem>();
  
  soonToExpireDataSource = new MatTableDataSource<FridgeItem>();
  shoppingListDataSource = new MatTableDataSource<FridgeItem>();
  displayedColumns: string[] = ['name', 'quantity', 'actions'];
  displayedColumnsQuantity: string[] = ['name', 'quantity'];

  today: Date = new Date();
  expirationDate: Date = new Date();
  timeDiff: number = 0;
  daysUntilExpiration: number = 0;
  index: number = 0;


 
 constructor(private fridgeService: FridgeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getShoppinglistItems();
    this.lowQuantityList();
    this.soonToExpireList();

    
  }


  getShoppinglistItems() {
    this.fridgeService.getShoppinglistData().subscribe((data: any) => {
      this.fridgeItems = data;
      this.shoppingListDataSource.data = this.fridgeItems;
    })
  }

 


  lowQuantityList() {
    this.fridgeService.getItemsData().subscribe((data: any) => {
      this.fridgeItems = data;
      this.lowQuantityItems = this.fridgeItems.filter(item => item.quantity < 3);
      this.lowQuantityDataSource.data = this.lowQuantityItems;
    });
  }

  soonToExpireList()  {
    this.fridgeService.getItemsData().subscribe((data: any) => {
    this.fridgeItems = data;
    this.soonToExpireItems = this.fridgeItems.filter(item => {
    this.today = new Date();
    this.expirationDate = new Date(item.expiryDate);
    this.timeDiff = this.expirationDate.getTime() - this.today.getTime();
    this.daysUntilExpiration = Math.ceil(this.timeDiff / (1000 * 3600 * 24));
      return this.daysUntilExpiration <= 3; // Show items that will expire in the next 3 days
    });
    this.soonToExpireDataSource.data = this.soonToExpireItems;
    });
    
  
  }

 

   deleteShoppinglistItem(id: number): void {
    this.fridgeService.deleteShoppinglistItem(id).subscribe(() => {
      this.getShoppinglistItems();
    });
    
    location.reload();
   
  }


   openDialog() {  
    const dialogRef = this.dialog.open(FridgeAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result != false) {
        this.updateShoppingList(result);
      }
    });
    
  }

  addItem(item:any) {
    console.log(item.name)
   
    this.newItemId = this.lowQuantityItems.length + 1;
    this.newFridgeItem = {id: this.newItemId, name: item.name, quantity: item.quantity, expiryDate: item.date, category: item.category, notes: item.notes, amount: item.amount, kcal: item.kcal, sugar: item.sugar,fat: item.fat,protein: item.protein, carbs: item.carbs };
 
    this.lowQuantityItems.push(this.newFridgeItem);
    this.lowQuantityDataSource.data = this.lowQuantityItems;
  
  }
  

  updateShoppingList(item:any) {
    this.fridgeService.getShoppinglistData().subscribe((data: any) => {
      this.fridgeItems = data; 
      this.addShoppingItem(item);
     
    this.fridgeService.updateShoppingList(this.fridgeItems).subscribe({
      next: () => {
        console.log('Daten erfolgreich aktualisiert.');
      },
      error: (error) => {
        throw error;
      }
    });
    
    });
  }

  addShoppingItem(item:any) {
    this.newItemId = this.fridgeItems.length + 1000;
    this.newFridgeItem = {id: this.newItemId, name: item.name, quantity: item.quantity, expiryDate: item.date, category: item.category, notes: item.notes, amount: item.amount, kcal: item.kcal, sugar: item.sugar,fat: item.fat,protein: item.protein, carbs: item.carbs };
    this.fridgeItems.push(this.newFridgeItem);
    this.shoppingListDataSource.data = this.fridgeItems;
  }



}






