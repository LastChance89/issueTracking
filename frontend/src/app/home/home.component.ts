import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
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

  
  card1 : Card = new Card("defect","Card 1",1,"Test User 1","Card 1", 1); 
  card2 : Card = new Card("enhancement","Card 2",1,"Test User 2","Card 2", 2); 
  cardList = [this.card1, this.card2];


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cardList, event.previousIndex, event.currentIndex);
  }
}
