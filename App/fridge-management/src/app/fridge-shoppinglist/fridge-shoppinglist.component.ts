import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { FridgeAddComponent } from '../fridge-add/fridge-add.component';
import { FridgeItem } from '../fridge-item.model';
import { FridgeService } from '../fridge.service';

@Component({
  selector: 'app-fridge-shoppinglist',
  templateUrl: './fridge-shoppinglist.component.html',
  styleUrls: ['./fridge-shoppinglist.component.scss']
})
export class FridgeShoppinglistComponent {
 

  lowQuantityItems: FridgeItem[] = [];
  soonToExpireItems: FridgeItem[] = [];
  newFridgeItem: FridgeItem = { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte" };
  newItemId: number = 0;
  dataSource = new MatTableDataSource<FridgeItem>(this.fridgeService.getLowQuantityItems());
  
  dataSource2 = new MatTableDataSource<FridgeItem>(this.fridgeService.getSoonToExpireItems());
  displayedColumns: string[] = ['name', 'quantity', 'actions'];
 
 constructor(private fridgeService: FridgeService, public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.dataSource);
    this.lowQuantityItems = this.fridgeService.getLowQuantityItems();
    this.soonToExpireItems = this.fridgeService.getSoonToExpireItems();
    this.dataSource.data = this.fridgeService.getLowQuantityItems();
    this.dataSource2.data = this.fridgeService.getSoonToExpireItems();
    
  }

  delete(deleteItem:FridgeItem): void {
    console.log(deleteItem);
    const index = this.lowQuantityItems.findIndex(item => item.id === deleteItem.id);
     if (index !== -1) {
    this.lowQuantityItems.splice(index, 1);
    this.dataSource.data = this.lowQuantityItems;
      }
   }


   openDialog() {  const dialogRef = this.dialog.open(FridgeAddComponent);

    dialogRef.afterClosed().subscribe(result => {
    //  console.log(result);
      this.addItem(result);
    });
  }

  addItem(item:any) {
    console.log(item.name)
   
    this.newItemId = this.lowQuantityItems.length + 1;
    this.newFridgeItem = {id: this.newItemId, name: item.name, quantity: item.quantity, expiryDate: item.date, category: item.category };
 
    this.lowQuantityItems.push(this.newFridgeItem);
    this.dataSource.data = this.lowQuantityItems;
  
  }
  

 // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
 

//  dataSource = new ExampleDataSource(this.dataToDisplay);

  addData() {
 //   const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
 //   this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
 //   this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
 //   this.dataToDisplay = this.dataToDisplay.slice(0, -1);
 //   this.dataSource.setData(this.dataToDisplay);
  }

}






