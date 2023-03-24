import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FridgeAddUnitComponent } from '../fridge-add-unit/fridge-add-unit.component';
import { FridgeService } from '../fridge.service';

@Component({
  selector: 'app-fridge-profile',
  templateUrl: './fridge-profile.component.html',
  styleUrls: ['./fridge-profile.component.scss']
})
export class FridgeProfileComponent {
  user: any = {name: "Max", email:"Mustermann@gmx.de", password: "wjqehqkj"};
  units: string[] = [];
  unit: string = "";
  capacity: number = 0;
  measurementSetting: string = "";
  languageSetting: string = "";
  localizationSetting: string = "";
  autoAddSetting: boolean = true;
  alertSetting: boolean = true;

  constructor(private fridgeService: FridgeService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  
  openSnackBar() {
    this.snackBar.open("Änderungen wurden gespeichert", 'OK',  {duration: 5000, panelClass:['saving-snackbar']});
  }

  ngOnInit() {
   // this.user = this.authService.getCurrentUser();
   this.units = this.fridgeService.fridgeUnits;
   this.capacity = this.fridgeService.fridgeCapacity = 150
  }

  updateProfile() {
   console.log(this.capacity);
   console.log(this.user.name);
   console.log(this.localizationSetting);
   console.log(this.languageSetting);
   console.log(this.measurementSetting);
   console.log(this.autoAddSetting);
   console.log(this.alertSetting);
   this.openSnackBar();
  }

  addItem(item:string) {
    this.fridgeService.fridgeUnits.push(item);
  }

  deleteUnit(deleteUnit:string) {
    
      const index = this.fridgeService.fridgeUnits.findIndex(item => item === deleteUnit);
       if (index !== -1) {
      this.fridgeService.fridgeUnits.splice(index, 1);
        }
     
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(FridgeAddUnitComponent);

  dialogRef.afterClosed().subscribe(result => {
   
    this.addItem(result);
  });
  }


 

}
