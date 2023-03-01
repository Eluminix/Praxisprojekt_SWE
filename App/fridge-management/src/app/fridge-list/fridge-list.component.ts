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


  displayedColumns: string[] = ['name', 'quantity', 'expiryDate'];
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

 delete(item:FridgeItem): void {
  console.log(item)
  this.fridgeItems.splice(item.id, 1);
  console.log(this.fridgeItems)
 }





// FIX TODO
 openDialog() {  const dialogRef = this.dialog.open(FridgeAddComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}


}

