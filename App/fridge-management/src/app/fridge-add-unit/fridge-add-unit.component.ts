import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fridge-add-unit',
  templateUrl: './fridge-add-unit.component.html',
  styleUrls: ['./fridge-add-unit.component.scss']
})
export class FridgeAddUnitComponent {
  unit: string = "";
  

  constructor(public dialogRef: MatDialogRef<FridgeAddUnitComponent>) { }


 
  ngOnInit(): void {

    const backdropClick$ = this.dialogRef.backdropClick();
    if (backdropClick$) {
      backdropClick$.subscribe(() => {
        this.cancel();
      });
    }

   
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
