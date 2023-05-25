import { Component, OnInit } from '@angular/core';

import { FridgeService } from '../fridge.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fridge-add',
  templateUrl: './fridge-add.component.html',
  styleUrls: ['./fridge-add.component.scss']
})
export class FridgeAddComponent implements OnInit {
  
  
  name: string = "";
  quantity: number = 0;
  date: Date = new Date();
  category: string = "";
  notes: string = "";
  amount: number = 0;
  kcal: number = 0;
  sugar: number = 0;
  fat: number = 0;
  protein: number = 0;
  carbs: number = 0;
  categories: string[] = [];
  backdropClick$: any;

  

  constructor(private fridgeService: FridgeService,public dialogRef: MatDialogRef<FridgeAddComponent>) { }



ngOnInit(): void {
    this.categories = this.fridgeService.categories;
    this.getBackdropClick();
  }

getBackdropClick() {
  this.backdropClick$ = this.dialogRef.backdropClick();
  if (this.backdropClick$) {
    this.backdropClick$.subscribe(() => {
      this.cancel();
    });
  }
}



  cancel(): void {
    this.dialogRef.close(false);
  }


  

}
