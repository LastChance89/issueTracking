import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Card } from '../model/card';
import { CardService } from '../service/cardservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cardService: CardService) { }

  enhancements: Card[] = [];
  defects: Card[] = [];

  ngOnInit() {
    let cards: Card[] = [];
    this.cardService.getAllCards().subscribe(result => {
      console.log(result);
      
      result.forEach(element => {
        if (element.type === "New Functionality") {
          this.enhancements.push(element);
        }
        if (element.type === "Defect") {
          this.defects.push(element);
        }
      });
    },
      //Make me error modal wiht better errors. 
    error => {
      console.log("error")
    }

    );



  }

  /*
  card1 : Card = new Card("defect","Card 1",1,"Test User 1","Card 1", 1); 
  card2 : Card = new Card("enhancement","Card 2",1,"Test User 2","Card 2", 2); 
  card3 : Card = new Card("enhancement","Card 3",1,"Test User 2","Card 3", 2); 
  cardList = [this.card1, this.card2];

  cardList2 = [this.card3];
*/
  cardList = []

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.cardList, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
    }

  }
}
