import { Component } from '@angular/core';

@Component({
  selector: 'app-fridge-profile',
  templateUrl: './fridge-profile.component.html',
  styleUrls: ['./fridge-profile.component.scss']
})
export class FridgeProfileComponent {
  user: any = {name: "Herbert", email:"herbert@gmx.de"};

  constructor() { }

  ngOnInit() {
   // this.user = this.authService.getCurrentUser();
  }

  updateProfile() {
   
  }

  


 

}
