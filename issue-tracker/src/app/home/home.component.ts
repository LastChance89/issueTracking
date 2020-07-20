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

  new: Card[] = [];
  inProgress: Card[] = [];
  testing: Card[] = [];
  approval: Card[] = [];
  completed: Card[] = [];


 

  ngOnInit() {
    let cards: Card[] = [];
    this.cardService.getAllCards().subscribe(result => {
      console.log(result);
      result.forEach(element => {
        switch(element.priority){    
          case 1:
            this.inProgress.push(element);
            break;
          case 2:
            this.testing.push(element);
            break;
          case 3:
            this.approval.push(element);
            break;
          case 4:
            this.completed.push(element);
            break;
          default: 
            this.new.push(element);
            break;
        }
        if (element.status === "New Functionality") {
          this.new.push(element);
        }
        if (element.status === "Defect") {
          this.inProgress.push(element);
        }
      });
    },
      //Make me error modal with better errors. 
    error => {
      console.log("error")
    }
    );
  }
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
