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
    this.cardService.getAllCards().subscribe(result => {
      console.log(result);
      this.new = result['new'];
      this.inProgress = result['inProgress'];
      this.testing = result['testing'];
      this.approval = result['approval'];
      this.completed = result['completed'];

    },
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

        let cardID = event.container.data[event.currentIndex]['_id'];
        let cardStatus: number;

        switch(event.container.element.nativeElement.id){
          case "inp":
            cardStatus=1;
            break;
          case "test":
            cardStatus=2;
            break;
          case "aprov":
            cardStatus=3;
            break;
          case "complete":
            cardStatus=4;
            break;
          default: //new status is default. 
            cardStatus = 0;
            break;
        }

        this.cardService.updateCard(cardID, cardStatus).subscribe(result =>{
          console.log(result);
        });
    }

  }
}
