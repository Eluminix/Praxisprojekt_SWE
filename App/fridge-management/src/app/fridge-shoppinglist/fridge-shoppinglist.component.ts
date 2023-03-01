import { Component } from '@angular/core';
import { FridgeItem } from '../fridge-item.model';
import { FridgeService } from '../fridge.service';

@Component({
  selector: 'app-fridge-shoppinglist',
  templateUrl: './fridge-shoppinglist.component.html',
  styleUrls: ['./fridge-shoppinglist.component.scss']
})
export class FridgeShoppinglistComponent {

  lowQuantityItems: FridgeItem[] = [];
  soonToExpireItems: FridgeItem[] = [];


  constructor(private fridgeService: FridgeService) { }

  ngOnInit() {
    this.lowQuantityItems = this.fridgeService.getLowQuantityItems();
    this.soonToExpireItems = this.fridgeService.getSoonToExpireItems();
  }
}
