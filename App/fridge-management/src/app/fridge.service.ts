import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { FridgeItem } from './fridge-item.model';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

 

  item: any;

 
 
//  private fridgeUrl = 'api/fridgeItems';
 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

 
  private fridgeItems: FridgeItem[] = [
    { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte" },
    { id: 2, name: 'Eier', quantity: 12, expiryDate: new Date(2023, 2, 1), category: "Eier" },
    { id: 3, name: 'Brot', quantity: 1, expiryDate: new Date(2023, 4, 5), category: "Teigwaren" },
    { id: 4, name: 'Sahne', quantity: 12, expiryDate: new Date(2023, 4, 10) , category: "Milchprodukte"},
    { id: 5, name: 'Banane', quantity: 1, expiryDate: new Date(2023, 4, 5) , category: "Obst"},
    { id: 6, name: 'Gurke', quantity: 2, expiryDate: new Date(2023, 4, 1) , category: "Gemüse"},
    { id: 7, name: 'Tomaten', quantity: 12, expiryDate: new Date(2023,4, 10) , category: "Gemüse"},
    { id: 8, name: 'Joghurt', quantity: 1, expiryDate: new Date(2023, 4, 5) , category: "Milchprodukte"},
    { id: 9, name: 'Steak', quantity: 12, expiryDate: new Date(2023, 4, 10) , category: "Fleisch"},
    { id: 10, name: 'Salami', quantity: 1, expiryDate: new Date(2023, 4, 5) , category: "Fleisch"},
    { id: 11, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte" },
  ];

  fridgeItems$: Observable<FridgeItem[]> = of(this.fridgeItems);

  categories: string[] = ['Milchprodukte','Eier', 'Gemüse', 'Obst', 'Fleisch', 'Fisch', 'Getränke', 'Teigwaren','Soßen & Dressing'];
  
  fridgeUnits: string[] = ['Seitenfach', 'Gefrierfach', 'Hauptfach'];
  
  fridgeUnits$: Observable<string[]> = of(this.fridgeUnits);

  fridgeCapacity: number = 0;

  getFridgeItems() {
    return this.fridgeItems;
  }

  getFridgeItemById(itemId: number): FridgeItem {
    this.fridgeItems.forEach(element => {
      if (element.id == itemId) {
          this.item = element
      }
    });
    console.log(this.item)
    return this.item
  }

 

   // Get fridge items with low quantity
   getLowQuantityItems(): FridgeItem[] {
    const lowQuantityItems = this.fridgeItems.filter(item => item.quantity < 2);
    return lowQuantityItems;
  }

  // Get fridge items that will expire soon
  getSoonToExpireItems(): FridgeItem[] {
    const soonToExpireItems = this.fridgeItems.filter(item => {
      const today = new Date();
      const expirationDate = new Date(item.expiryDate);
      const timeDiff = expirationDate.getTime() - today.getTime();
      const daysUntilExpiration = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysUntilExpiration <= 3; // Show items that will expire in the next 3 days
    });
    return soonToExpireItems;
  }


 isLowOnQuantity(item: FridgeItem): boolean {
    const minQuantity = 2; // hier können Sie die Mindestmenge festlegen
    return item.quantity < minQuantity;
  }
   getDaysUntilExpiration(item: FridgeItem): number {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  }

}
