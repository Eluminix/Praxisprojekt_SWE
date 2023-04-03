import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fridge-add-unit',
  templateUrl: './fridge-add-unit.component.html',
  styleUrls: ['./fridge-add-unit.component.scss']
})
export class FridgeAddUnitComponent {
  unit: string = "";
  dialogRef: any;

 
}
