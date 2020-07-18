import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from '../model/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /*
  card1 : Card = new Card("defect","Card 1",1,"Test User 1","Card 1", 1); 
  card2 : Card = new Card("enhancement","Card 2",1,"Test User 2","Card 2", 2); 
  card3 : Card = new Card("enhancement","Card 3",1,"Test User 2","Card 3", 2); 
  cardList = [this.card1, this.card2];

  cardList2 = [this.card3];
*/
cardList =[]

  drop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer === event.container){
      moveItemInArray(this.cardList, event.previousIndex, event.currentIndex);
    }
    else{
      transferArrayItem(event.previousContainer.data,event.container.data, 
        event.previousIndex, event.currentIndex);
    }
    
  }
}
