import { Component, OnInit } from '@angular/core';

import { FridgeService } from '../fridge.service';

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
  categories: string[] = [];

  

  constructor(private fridgeService: FridgeService) { }



ngOnInit(): void {
    this.categories = this.fridgeService.categories;
  }


}
