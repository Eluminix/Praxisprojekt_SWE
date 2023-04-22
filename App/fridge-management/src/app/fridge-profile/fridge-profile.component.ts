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
  user: any;
  username: string = "";
  usermail: string = "";
  userpassword: string = "";
  units: string[] = [];
  unit: string = "";
  capacity: number = 0;
  measurementSetting: string = "";
  languageSetting: string = "";
  localizationSetting: string = "";
  autoAddSetting: boolean = true;
  alertSetting: boolean = true;
  data: any;

  constructor(private fridgeService: FridgeService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    
   }

  
  openSnackBar() {
    this.snackBar.open("Änderungen wurden gespeichert", 'OK',  {duration: 5000, panelClass:['saving-snackbar']});
  }

  ngOnInit() {
   // this.user = this.authService.getCurrentUser();
  
   this.getData();

  }

  

 
  getData() {
    this.fridgeService.getData().subscribe((data: any) => {
      this.data = data;
      this.units = this.data.units;
      console.log(this.units)
      this.capacity = this.data.capacity;
      this.measurementSetting = this.data.measurementSetting;
   this.languageSetting = this.data.languageSetting;
  this.localizationSetting = this.data.localizationSetting;
  this.autoAddSetting = this.data.autoAddSetting;
  this.alertSetting = this.data.alertSetting;
  this.username = this.data.username
  this.usermail = this.data.usermail
  this.userpassword = this.data.userpassword;
  
    });
  }
/*
  {
    "user": [{"name": "Max"}, {"email": "test@gmx.de"}, {"password": "wqeqw"}],
    "units": ["Seitenfach", "Gefrierfach", "Hauptfach"],
    "capacity": 150,
  "measurementSetting": "metrisch",
  "languageSetting": "deutsch",
  "localizationSetting": "euro",
  "autoAddSetting": true,
  "alertSetting": true
}
*/
  updateProfile() {

    const newData = { 
      "username": this.username,
      "usermail": this.usermail,
      "userpassword": this.userpassword,
      "units": this.units,
    "capacity": this.capacity,
   "measurementSetting": this.measurementSetting,
   "languageSetting": this.languageSetting,
  "localizationSetting": this.localizationSetting,
  "autoAddSetting": this.autoAddSetting,
  "alertSetting": this.alertSetting
    };
    this.fridgeService.updateData(newData).subscribe({
      next: () => {
        console.log('Daten erfolgreich aktualisiert.');
      },
      error: (error) => {
        console.error(error);
      }
    });
   console.log(this.capacity);
   console.log(this.username);
   console.log(this.localizationSetting);
   console.log(this.languageSetting);
   console.log(this.measurementSetting);
   console.log(this.autoAddSetting);
   console.log(this.alertSetting);
   this.openSnackBar();
  }

  addItem(item:string) {
    this.units.push(item);
    this.updateProfile();
  }

  deleteUnit(unit :any) {
    console.log(unit)
    this.fridgeService.deleteData(unit).subscribe(() => {
      this.getData();
    });
    this.units = this.units.filter(item =>  item !== unit);  
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(FridgeAddUnitComponent);

  dialogRef.afterClosed().subscribe(result => {
    if(result != false) {
      this.addItem(result);
    }
  });
  }


 

}
