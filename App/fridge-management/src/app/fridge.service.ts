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
    { id: 1, name: 'Milk', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "food" },
    { id: 2, name: 'Eggs', quantity: 12, expiryDate: new Date(2023, 2, 1), category: "food" },
    { id: 3, name: 'Bread', quantity: 1, expiryDate: new Date(2023, 4, 5), category: "food" },
    { id: 4, name: 'Sahne', quantity: 12, expiryDate: new Date(2023, 4, 10) , category: "food"},
    { id: 5, name: 'Banane', quantity: 1, expiryDate: new Date(2023, 4, 5) , category: "food"},
    { id: 6, name: 'Gurke', quantity: 2, expiryDate: new Date(2023, 4, 1) , category: "food"},
    { id: 7, name: 'Tomaten', quantity: 12, expiryDate: new Date(2023,4, 10) , category: "food"},
    { id: 8, name: 'Joghurt', quantity: 1, expiryDate: new Date(2023, 4, 5) , category: "food"},
    { id: 9, name: 'Fleisch', quantity: 12, expiryDate: new Date(2023, 4, 10) , category: "food"},
    { id: 10, name: 'Wurst', quantity: 1, expiryDate: new Date(2023, 4, 5) , category: "food"}
  ];

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
    const lowQuantityItems = this.fridgeItems.filter(item => item.quantity < 5);
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


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
