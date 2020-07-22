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
      result.forEach(element => {
        switch(element.status){    
          case "In Progress":
            this.inProgress.push(element);
            break;
          case "Testing":
            this.testing.push(element);
            break;
          case "Approval":
            this.approval.push(element);
            break;
          case "Completed":
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

        let cardID = event.container.data[event.currentIndex]['_id'];
        let cardStatus: String;

        switch(event.container.element.nativeElement.id){
          case 'new':
            cardStatus = "New"
            break;
          case "inp":
            cardStatus = "In Progress";
            break;
          case "test":
            cardStatus = "Testing";
            break;
          case "aprov":
            cardStatus = "Approval"
            break;
          case "complete":
            cardStatus = "Completed";
            break;
        }

        this.cardService.updateCard(cardID, cardStatus).subscribe(result =>{
          console.log(result);
        });
    }

  }
}
