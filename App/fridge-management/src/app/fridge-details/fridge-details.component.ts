import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FridgeService } from '../fridge.service';
import { FridgeItem } from '../fridge-item.model';

@Component({
  selector: 'app-fridge-details',
  templateUrl: './fridge-details.component.html',
  styleUrls: ['./fridge-details.component.scss']
})
export class FridgeDetailsComponent implements OnInit {

  itemId: number = 0;
  item!: FridgeItem;

  constructor(private route: ActivatedRoute, private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.itemId = Number(params!.get('id'));
      this.item = this.fridgeService.getFridgeItemById(this.itemId);
    });
  }

  updateFridgeItem(item: FridgeItem): void {
    // Implement the update functionality here
  }

  deleteFridgeItem(itemId: number): void {
    // Implement the delete functionality here
  }

}