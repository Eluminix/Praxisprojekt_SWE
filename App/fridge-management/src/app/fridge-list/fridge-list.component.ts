import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FridgeItem } from '../fridge-item.model';
import { FridgeService } from '../fridge.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { FridgeAddComponent } from '../fridge-add/fridge-add.component';
import { BehaviorSubject, Observable, of } from 'rxjs';




@Component({
  selector: 'app-fridge-list',
  templateUrl: './fridge-list.component.html',
  styleUrls: ['./fridge-list.component.scss']
})
export class FridgeListComponent implements OnInit {

  
  newFridgeItem: FridgeItem = { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  };
  newItemId: number = 0;
  displayedColumns: string[] = ['name', 'quantity', 'expiryDate'];
  categories: string[] = ['Milchprodukte','Eier', 'Gemüse', 'Obst', 'Fleisch', 'Fisch', 'Getränke', 'Teigwaren','Soßen & Dressing'];
  dataSource: MatTableDataSource<FridgeItem>  = new MatTableDataSource<FridgeItem>();
  
 fridgeItems: FridgeItem[] = [];

  selectedItem: any;
  


  constructor(private fridgeService: FridgeService,public dialog: MatDialog, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getItemsData();
  }



  

  getItemsData(): void {

    this.fridgeService.getItemsData().subscribe((data: any) => {
      console.log(data);
      this.fridgeItems = data;
      this.dataSource.data = this.fridgeItems;
    });
  }

  
  addItem(item:any) {
    this.newItemId = this.fridgeItems.length + 1;
    console.log(this.newItemId)
    this.newFridgeItem = {id: this.newItemId, name: item.name, quantity: item.quantity, expiryDate: item.date, category: item.category, notes: item.notes, amount: item.amount, kcal: item.kcal, sugar: item.sugar,fat: item.fat,protein: item.protein, carbs: item.carbs };
    this.fridgeService.addItem(this.newFridgeItem).subscribe({
      next: () => {
        console.log('Daten erfolgreich aktualisiert.');
      },
      error: (error) => {
        throw error
      }
    });
    this.fridgeItems.push(this.newFridgeItem);
    this.dataSource.data = this.fridgeItems;
  }


  deleteItem(id: number): void {
    this.fridgeService.deleteItem(id).subscribe(() => {
      this.getItemsData();
    });
    this.fridgeItems = this.fridgeItems.filter(item => item.id !== id);
    this.dataSource.data = this.fridgeItems;
   
  }
 





 openAddItemDialog() {  
  const dialogRef = this.dialog.open(FridgeAddComponent);
 
  dialogRef.afterClosed().subscribe(result => {

    if (result != false) {
      this.addItem(result);
    }
    
  });
}


}

