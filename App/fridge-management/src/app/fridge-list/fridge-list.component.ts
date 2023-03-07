import { Component, OnInit } from '@angular/core';
import { FridgeItem } from '../fridge-item.model';
import { FridgeService } from '../fridge.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { FridgeAddComponent } from '../fridge-add/fridge-add.component';




@Component({
  selector: 'app-fridge-list',
  templateUrl: './fridge-list.component.html',
  styleUrls: ['./fridge-list.component.scss']
})
export class FridgeListComponent implements OnInit {

  newFridgeItem: FridgeItem = { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte" };
  newItemId: number = 0;
  displayedColumns: string[] = ['name', 'quantity', 'expiryDate'];
  categories: string[] = ['Milchprodukte','Eier', 'Gemüse', 'Obst', 'Fleisch', 'Fisch', 'Getränke', 'Teigwaren','Soßen & Dressing'];
  dataSource: MatTableDataSource<FridgeItem>  = new MatTableDataSource<FridgeItem>();
  
  fridgeItems: FridgeItem[] = [];

  selectedItem: any;

  constructor(private fridgeService: FridgeService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFridgeItems();
   
  }


  getFridgeItems(): void {
    this.fridgeItems = this.fridgeService.getFridgeItems()
    this.dataSource.data = this.fridgeItems;
    console.log(this.dataSource.data)
 //     .subscribe((fridgeItems: FridgeItem[]) => this.fridgeItems = fridgeItems);
  }

  getFridgeItem(): void {
    this.selectedItem = this.fridgeService.getFridgeItemById(1);
  }

  onSelect(item: FridgeItem): void {
    this.selectedItem = item;
  }

 delete(deleteItem:FridgeItem): void {
  const index = this.fridgeItems.findIndex(item => item.id === deleteItem.id);
   if (index !== -1) {
  this.fridgeItems.splice(index, 1);
    }
 }

addItem(item:any) {
  console.log(item.name)
 
  this.newItemId = this.fridgeItems.length + 1;
  this.newFridgeItem = {id: this.newItemId, name: item.name, quantity: item.quantity, expiryDate: item.date, category: item.category };
  console.log(this.newFridgeItem)
  this.fridgeItems.push(this.newFridgeItem);
  console.log(this.fridgeItems);

}



// FIX TODO
 openDialog() {  const dialogRef = this.dialog.open(FridgeAddComponent);

  dialogRef.afterClosed().subscribe(result => {
  //  console.log(result);
    this.addItem(result);
  });
}


}

