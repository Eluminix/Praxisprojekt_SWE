import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  dataSource = new MatTableDataSource<FridgeItem>();
  
  dataSource2 = new MatTableDataSource<FridgeItem>();
  dataSource3 = new MatTableDataSource<FridgeItem>();
  displayedColumns: string[] = ['name', 'quantity', 'actions'];
  displayedColumnsQuantity: string[] = ['name', 'quantity'];
 
 constructor(private fridgeService: FridgeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getShoppinglistItems();
    this.lowQuantityList();
    this.soonToExpireList();

    
  }


  getShoppinglistItems() {
    this.fridgeService.getShoppinglistData().subscribe((data: any) => {
      this.fridgeItems = data;
      this.dataSource3.data = this.fridgeItems;
    })
  }

 


  lowQuantityList() {
    this.fridgeService.getItemsData().subscribe((data: any) => {
      this.fridgeItems = data;
      this.lowQuantityItems = this.fridgeItems.filter(item => item.quantity < 3);
      this.dataSource.data = this.lowQuantityItems;
    });
  }

  soonToExpireList()  {
    this.fridgeService.getItemsData().subscribe((data: any) => {
    this.fridgeItems = data;
    this.soonToExpireItems = this.fridgeItems.filter(item => {
      const today = new Date();
      const expirationDate = new Date(item.expiryDate);
      const timeDiff = expirationDate.getTime() - today.getTime();
      const daysUntilExpiration = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysUntilExpiration <= 3; // Show items that will expire in the next 3 days
    });
    this.dataSource2.data = this.soonToExpireItems;
    });
    
  
  }

  delete(deleteItem:FridgeItem): void {
    console.log(deleteItem);
    const index = this.lowQuantityItems.findIndex(item => item.id === deleteItem.id);
     if (index !== -1) {
    this.lowQuantityItems.splice(index, 1);
    this.dataSource.data = this.lowQuantityItems;
      }
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
    this.dataSource.data = this.lowQuantityItems;
  
  }
  

  updateShoppingList(item:any) {
    this.fridgeService.getShoppinglistData().subscribe((data: any) => {
      this.fridgeItems = data; 
    //  this.lowQuantityItems = this.fridgeItems.filter(item => item.quantity < 3);
      this.newItemId = this.fridgeItems.length + 1000;
        this.newFridgeItem = {id: 1000 + this.newItemId, name: item.name, quantity: item.quantity, expiryDate: item.date, category: item.category, notes: item.notes, amount: item.amount, kcal: item.kcal, sugar: item.sugar,fat: item.fat,protein: item.protein, carbs: item.carbs };
        this.fridgeItems.push(this.newFridgeItem);
      
      this.dataSource3.data = this.fridgeItems;

     
    this.fridgeService.updateShoppingList(this.fridgeItems).subscribe({
      next: () => {
        console.log('Daten erfolgreich aktualisiert.');
      },
      error: (error) => {
        console.error(error);
      }
    });
    
    });

   


   
   

  }

}






