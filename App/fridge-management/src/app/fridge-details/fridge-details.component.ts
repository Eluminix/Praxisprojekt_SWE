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
  item: FridgeItem =  { id: 1, name: 'Milch', quantity: 2, expiryDate: new Date(2023, 4, 1), category: "Milchprodukte", notes: "test", amount: 12, kcal: 1, sugar: 1,fat: 1,protein: 1, carbs: 1 };
  img: string = "";
  description: string = "";
  chips: string[] = [];
  quantityValue: number = 0;
  dateValue: any;
  nameValue: string = "";
  notesValue: string = "";
  amountValue: number = 0;
  kcalValue: number = 0;
  sugarValue: number = 0;
  fatValue: number = 0;
  proteinValue: number = 0;
  carbsValue: number = 0;

  categoryImg: any[] = [
  {category: 'Milchprodukte', img: '/assets/images/milch.jpeg', description: 'Milch ist toll', chips: ['Milch', 'Vitamine', 'Protein', 'Laktose']}, 
  {category: 'Eier', img: '/assets/images/eier.jpg' , description: 'Eier sind toll', chips: ['Eier', 'Eiweis', 'Fette', 'Cholesterin']},
  {category: 'Gemüse', img: '/assets/images/gemüse.jpg', description: 'Gemüse ist toll', chips: ['Gemüse', 'Vitamine', 'Ballaststoffe', 'Mineralstoffe']}, 
  {category: 'Obst', img: '/assets/images/obst.jpg', description: 'Obst ist toll', chips: ['Obst', 'Wasser', 'Vitamine', 'Fructose']},
  {category: 'Fleisch', img: '/assets/images/fleisch.jpg', description: 'Fleisch ist toll', chips: ['Fleisch', 'Mineralstoffe', 'Protein', 'Fette']}, 
  {category: 'Fisch', img: '/assets/images/fisch.jpg', description: 'Fisch ist toll', chips: ['Fisch', 'Jod', 'Protein', 'Vitamine']},
  {category: 'Getränke', img: '/assets/images/getränke.jpg', description: 'Getränke sind toll', chips: ['Getränke', 'Vitamine', 'Mineralstoffe', 'Zucker']}, 
  {category: 'Teigwaren', img: '/assets/images/teigwaren.jpg', description: 'Teigwaren sind toll', chips: ['Teigwaren', 'Getreide', 'Mehl', 'Gluten']},
  {category: 'Soßen & Dressing', img: '/assets/images/soßen.jpg', description: 'Soßen sind toll', chips: ['Soßen', 'Geschmacksverstärker', 'Zucker', 'Laktose']}
];



  constructor(private route: ActivatedRoute, private fridgeService: FridgeService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.itemId = Number(params!.get('id'));
    //  this.item = this.fridgeService.getFridgeItemById(this.itemId);
      this.fridgeService.getItemById(this.itemId).subscribe(item => {
        this.item = item;
         this.categoryImg.forEach(element => {
          if (item.category == element.category) {
            this.img = element.img;
            this.description = element.description;
            this.chips = element.chips;
          }
        });
         this.quantityValue = item.quantity;
    this.dateValue = item.expiryDate;
    this.nameValue = item.name;
    this.notesValue = item.notes;
    this.amountValue = item.amount;
    this.kcalValue = item.kcal;
    this.sugarValue = item.sugar;
    this.fatValue = item.fat;
    this.proteinValue = item.protein;
    this.carbsValue = item.carbs;
      })
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


  updateFridgeItemDetailsWithEnter($event: any) {
    if ($event.keyCode === 13) {
      this.item.quantity = this.quantityValue;
      this.item.name = this.nameValue;
      this.item.expiryDate = this.dateValue;
      this.item.name = this.nameValue;
      this.item.notes = this.notesValue;
      this.item.amount = this.amountValue;
      this.item.kcal = this.kcalValue;
      this.item.sugar = this.sugarValue;
      this.item.fat = this.fatValue;
      this.item.protein = this.proteinValue;
      this.item.carbs = this.carbsValue;
      
        this.fridgeService.updateItem(this.item).subscribe(() => {
          
         
        });

       
      
    }
  }

}