import { TestBed } from '@angular/core/testing';
import { FridgeService } from './fridge.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FridgeItem } from './fridge-item.model';


describe('FridgeService', () => {
  let fridgeService: FridgeService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
          imports: [HttpClientModule, HttpClientTestingModule],
          providers: [FridgeService]
      });
    fridgeService = TestBed.inject(FridgeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return true if item is low on quantity', () => {
    const item = { id: 1, name: 'Test', quantity: 1, expiryDate: new Date(), category: 'Test', notes: '', amount: 0, kcal: 0, sugar: 0, fat: 0, protein: 0, carbs: 0 };
    const result = fridgeService.isLowOnQuantity(item);
    expect(result).toBeTrue();
    
  });

  it('should return false if item is not low on quantity', () => {
    const item = { id: 1, name: 'Test', quantity: 6, expiryDate: new Date(), category: 'Test', notes: '', amount: 0, kcal: 0, sugar: 0, fat: 0, protein: 0, carbs: 0 };
    const result = fridgeService.isLowOnQuantity(item);
    expect(result).toBeFalse();
    
  });

  it('should return days until expiration', () => {
    const item = { id: 1, name: 'Test', quantity: 1, expiryDate: new Date(2023, 4, 1), category: 'Test', notes: '', amount: 0, kcal: 0, sugar: 0, fat: 0, protein: 0, carbs: 0 };
    const result = fridgeService.getDaysUntilExpiration(item);
    expect(result).toBeGreaterThan(0);
  });


  //  Profil Tests


  it('should retrieve data from the API via GET', () => {
    const mockData = { username:'Hansi Bär',usermail:'test@web.de',userpassword:'wqe',units:['Seitenfach','Gefrierfach','Hauptfach'],capacity:165,measurementSetting:'imperial',languageSetting:'deutsch',localizationSetting:'eur',autoAddSetting:false,alertSetting:false};
    fridgeService.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne(fridgeService.dataurl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should update data via POST', () => {
    const mockNewData = { username: 'Jörg' };
    fridgeService.updateData(mockNewData).subscribe(data => {
      expect(data).toEqual(mockNewData);
    });
    const req = httpMock.expectOne(fridgeService.dataurl);
    expect(req.request.method).toBe('POST');
    req.flush(mockNewData);
  });

  it('should delete data via DELETE', () => {
    const mockUnit = 'Eisfach';
    fridgeService.deleteData(mockUnit).subscribe(data => {
      expect(data).toBeNull();
    });
    const req = httpMock.expectOne(`${fridgeService.dataurl}/${mockUnit}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });



  // Artikelliste Tests

  it('should return an array of FridgeItems', () => {
    const expectedData: FridgeItem[] = [
        { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  },
        { id: 2, name: 'Eier', quantity: 6, expiryDate: new Date(2023, 4, 2), category: "Eier", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  },
      ];;
  
    fridgeService.getItemsData().subscribe((data: any) => {
      expect(data).toEqual(expectedData);
    });
  
    const req = httpMock.expectOne(fridgeService.itemsurl);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });


  it('should update a FridgeItem and return the updated item', () => {
    const newItem: FridgeItem = { id: 1, name: 'Käse', quantity: 1, expiryDate: new Date(2023, 4, 1), category: 'Milchprodukte', notes: '', amount: 50, kcal: 200, sugar: 1, fat: 10, protein: 5, carbs: 10 };
    const expectedData: FridgeItem = { ...newItem };
  
    fridgeService.updateItemsData(newItem).subscribe((data: FridgeItem) => {
      expect(data).toEqual(expectedData);
    });
  
    const req = httpMock.expectOne(fridgeService.itemsurl);
    expect(req.request.method).toBe('POST');
    req.flush(expectedData);
  });


  it('should delete a FridgeItem and return success message', () => {
    const itemId = 1;
    const expectedData = 'Item deleted successfully';
  
    fridgeService.deleteItem(itemId).subscribe((data: any) => {
      expect(data).toEqual(expectedData);
    });
  
    const req = httpMock.expectOne(`${fridgeService.itemsurl}/${itemId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(expectedData);
  });


  // Detail Tests

 it('should return the fridge item with the given id', () => {
      const itemId = 1;
      const mockItems = [
        { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  },
        { id: 2, name: 'Eier', quantity: 6, expiryDate: new Date(2023, 4, 2), category: "Eier", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  },
         ];

      const expectedItem =  { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  };
       ;

      fridgeService.getItemById(itemId).subscribe((item: FridgeItem) => {
        expect(item).toEqual(expectedItem);
      });

      const req = httpMock.expectOne(`${fridgeService.itemsurl}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockItems);
    });


    it('should update the fridge item', () => {
        const itemToUpdate: FridgeItem =   { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  };
       
        const expectedResponse = { message: 'Fridge item updated successfully.' };
  
        fridgeService.updateItem(itemToUpdate).subscribe((response: any) => {
          expect(response).toEqual(expectedResponse);
        });
  
        const req = httpMock.expectOne(`${fridgeService.itemsurl}/${itemToUpdate.id}`);
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(itemToUpdate);
        req.flush(expectedResponse);
      });


      // Shoppingliste Tests

      it('should get shopping list data', () => {
        const mockData = [
            { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  },
            { id: 2, name: 'Eier', quantity: 6, expiryDate: new Date(2023, 4, 2), category: "Eier", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  }
        ];
             
        fridgeService.getShoppinglistData().subscribe((data) => {
          expect(data).toEqual(mockData);
        });
    
        const req = httpMock.expectOne(fridgeService.shoppinglisturl);
        expect(req.request.method).toEqual('GET');
        req.flush(mockData);
      });


      it('should update shopping list', () => {
        const mockData = { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1  };
    
        fridgeService.updateShoppingList(mockData).subscribe((data) => {
          expect(data).toEqual(mockData);
        });
    
        const req = httpMock.expectOne(fridgeService.shoppinglisturl);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(mockData);
        req.flush(mockData);
      });


      it('should delete shopping list item', () => {
        const itemId = 1;
    
        fridgeService.deleteShoppinglistItem(itemId).subscribe((data) => {
          expect(data).toEqual(itemId);
        });
    
        const req = httpMock.expectOne(`${fridgeService.shoppinglisturl}/${itemId}`);
        expect(req.request.method).toEqual('DELETE');
        req.flush(itemId);
      });


   











});
