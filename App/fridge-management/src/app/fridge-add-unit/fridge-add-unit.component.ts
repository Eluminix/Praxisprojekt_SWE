import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fridge-add-unit',
  templateUrl: './fridge-add-unit.component.html',
  styleUrls: ['./fridge-add-unit.component.scss']
})
export class FridgeAddUnitComponent {
  unit: string = "";
  backdropClick$: any;
  
  

  constructor(public dialogRef: MatDialogRef<FridgeAddUnitComponent>) { }


 
  ngOnInit(): void {
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
