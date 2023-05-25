import { Component, OnInit, ViewChild } from '@angular/core';
import { FridgeService } from '../fridge.service';
import { FridgeItem } from '../fridge-item.model';
import { Fridge } from '../fridge.model';
import { Chart }  from 'chart.js/auto';

@Component({
  selector: 'app-fridge-stats',
  templateUrl: './fridge-stats.component.html',
  styleUrls: ['./fridge-stats.component.scss']
})
export class FridgeStatsComponent implements OnInit {

  public chart: any;
  public chartCategory: any;
  profileData: any;

  fridge: Fridge[] = [];
  fridgeItems: FridgeItem[] = [];
  totalItems: number = 0;
  totalCapacity: number = 0;
  totalUsedCapacity: number = 0;
  totalFreeCapacity: number = 0;
  totalQuantities: number = 0;
  avgQuantity: number = 0;
  minQuantity: number = 0;
  maxQuantity: number = 0;

  mappedCategory: any[] = [];
  counter: number = 0;
  labels: string[] = []
  data: number[] = [];

  

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.getProfileData();
    this.createCharts();
  }

  createCharts() {
    this.fridgeService.getItemsData().subscribe((data: any) => {
      this.fridgeItems = data;

      this.setEntireContentData();
      this.setCategoryData();
      
      this.createEnitreContentChart();
      this.createCategoryChart();
    });
  }

  setEntireContentData() {
    this.totalItems = this.fridgeItems.length;
     
    this.totalUsedCapacity = this.fridgeItems.reduce((total, item) => total + item.quantity, 0);
    this.totalFreeCapacity = this.totalCapacity - this.totalUsedCapacity;
    
// Calculate average, minimum and maximum quantities of all items
    this.totalQuantities = this.fridgeItems.reduce((total, item) => total + item.quantity, 0);
    this.avgQuantity = this.totalQuantities / this.totalItems;
    this.minQuantity = Math.min(...this.fridgeItems.map(item => item.quantity));
    this.maxQuantity = Math.max(...this.fridgeItems.map(item => item.quantity));
  }

  setCategoryData() {
    for (let index = 0; index < this.fridgeService.categories.length; index++) {
      var filter = this.fridgeItems.filter(item => item.category === this.fridgeService.categories[index]);
      this.mappedCategory.push({name: this.fridgeService.categories[index], quantity: filter.length})
    }
    console.log(this.mappedCategory)

    this.mappedCategory.forEach(element => {
      this.labels.push(element.name)
    });

    this.mappedCategory.forEach(element => {
      this.data.push(element.quantity)
    });
  }





  createEnitreContentChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Gesamtinhalt', 'Gesamtkapazität', 'Genutzte Kapazität','Freie Kapazität',
								 'Durchschnittliche Anzahl', 'Minimale Anzahl', 'Maximale Anzahl'], 
	       datasets: [
          {
            label: "Anzahl",
            data: [this.totalItems,  this.totalCapacity,  this.totalUsedCapacity , this.totalFreeCapacity , this.avgQuantity,
              this.minQuantity, this.maxQuantity],
            backgroundColor: '#134E5E'
          },
        
        ]
      },
      options: {
        aspectRatio:2
      }
      
      
    });
  }

  
  createCategoryChart() {
    this.chartCategory = new Chart("CategoryChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.labels, 
	       datasets: [
          {
            label: "Anzahl",
            data: this.data,
            backgroundColor: '#134E5E'
          },
        
        ]
      },
      options: {
        aspectRatio:2
      }
      
    });
  }


  getProfileData() {
    this.fridgeService.getProfileConfigurationData().subscribe((data: any) => {
      this.profileData = data;
      this.totalCapacity = this.profileData.capacity;
      
    })  
  }
  



}
