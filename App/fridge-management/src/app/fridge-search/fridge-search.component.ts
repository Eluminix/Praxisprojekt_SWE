import { Component, OnInit } from '@angular/core';
import { FridgeService } from '../fridge.service';
import { FridgeItem } from '../fridge-item.model';

@Component({
  selector: 'app-fridge-search',
  template: `
    <input [(ngModel)]="searchTerm" placeholder="Search">
    <ul>
      <li *ngFor="let item of filteredItems">{{ item.name }}</li>
    </ul>
  `,
  styleUrls: ['./fridge-search.component.scss']
})
export class FridgeSearchComponent implements OnInit {
  items: FridgeItem[] = [];
  filteredItems: FridgeItem[] = [];
  searchTerm!: string;

  constructor(private fridgeService: FridgeService) { }

  ngOnInit() {
 //   this.fridgeService.getFridgeItems().subscribe(items => {
 //     this.items = items;
 //     this.filteredItems = items;
 //   });
  }

  filterItems() {
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
