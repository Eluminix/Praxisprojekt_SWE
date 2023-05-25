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

  fridgeItem: FridgeItem =   { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1 };
  fridgeItemList: FridgeItem[] = [];

  minQuantity: number = 0;
  expiryDate: Date = new Date();
  today: Date = new Date();
  timeDiff: number = 0;
  daysDiff: number = 0;
 
 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  

 
  fridgeItems: FridgeItem[] = [];

  fridgeItems$: Observable<FridgeItem[]> = of(this.fridgeItems);
  



  categories: string[] = ['Milchprodukte','Eier', 'Gemüse', 'Obst', 'Fleisch', 'Fisch', 'Getränke', 'Teigwaren','Soßen & Dressing'];
  
  fridgeUnits: string[] = ['Seitenfach', 'Gefrierfach', 'Hauptfach'];
  
  fridgeUnits$: Observable<string[]> = of(this.fridgeUnits);

  fridgeCapacity: number = 0;

  getFridgeItems() {
    return this.fridgeItems;
  }


 isLowOnQuantity(item: FridgeItem): boolean {
    this.minQuantity = 2; // hier können Sie die Mindestmenge festlegen
    return item.quantity < this.minQuantity;
  }

   getDaysUntilExpiration(item: FridgeItem): number {
    this.expiryDate = new Date(item.expiryDate);
    this.today = new Date();
    this.timeDiff = this.expiryDate.getTime() - this.today.getTime();
    this.daysDiff = Math.ceil(this.timeDiff / (1000 * 3600 * 24));
    return this.daysDiff;
  }


dataurl = 'http://localhost:3000/data';
itemsurl = 'http://localhost:3000/items';
shoppinglisturl = 'http://localhost:3000/shoppinglist'

  data: any;
  itemsData: any;

  constructor(private http: HttpClient) {

  }

  // Profil
  getProfileConfigurationData() {
    return this.http.get(this.dataurl);
  }

  updateData(newData: any): Observable<any> {
    return this.http.post(this.dataurl, newData);
  }

  deleteData(unit: any): Observable<any> {
    const url = `${this.dataurl}/${unit}`;
    return this.http.delete(url);
  }



// Artikelliste
  getItemsData() {
    return this.http.get(this.itemsurl);
  }

  


  addItem(newData: FridgeItem): Observable<any> {
    return this.http.post(this.itemsurl, newData);
  }


  deleteItem(id: number): Observable<any> {
    const url = `${this.itemsurl}/${id}`;
    return this.http.delete(url);
  }

  

 // Detail
  getItemById(itemId: number): Observable<FridgeItem> {
    return this.getItemsData().pipe(
      map((data: any) => {
        console.log(data);
        this.fridgeItemList = data;
        this.fridgeItemList.forEach(element => {
          if (element.id === itemId) {
            this.fridgeItem = element;
          }
        });
        return this.fridgeItem;
       })
    );
}

updateItem(item: FridgeItem): Observable<any> {
  return this.http.put(`${this.itemsurl}/${item.id}`, item);
}

// Shoppingliste

getShoppinglistData() {
  return this.http.get(this.shoppinglisturl);
}
updateShoppingList(newData: any): Observable<any> {
  return this.http.post(this.shoppinglisturl, newData);
}


deleteShoppinglistItem(id: number): Observable<any> {
  const url = `${this.shoppinglisturl}/${id}`;
  return this.http.delete(url);
}




 

  

   



 

    
  




}
