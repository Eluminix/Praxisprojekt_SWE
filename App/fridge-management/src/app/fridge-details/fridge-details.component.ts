import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FridgeService } from '../fridge.service';
import { FridgeItem } from '../fridge-item.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fridge-details',
  templateUrl: './fridge-details.component.html',
  styleUrls: ['./fridge-details.component.scss']
})
export class FridgeDetailsComponent implements OnInit {

  itemId: number = 0;
  item!: FridgeItem;

  constructor(private route: ActivatedRoute, private fridgeService: FridgeService, private snackBar: MatSnackBar) { }

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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}