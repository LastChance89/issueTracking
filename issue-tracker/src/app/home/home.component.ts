import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ViewChildren, QueryList, ContentChild, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Card } from '../model/card';
import { CardService } from '../service/cardservice.service';
import { SubMenuComponent } from '../modal/sub-menu/sub-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  constructor(private cardService: CardService, ) { }
 
  @ViewChild(SubMenuComponent,{static:true}) subMenuComponent: SubMenuComponent;


ngOnInit() {
  //this.subMenuComponent.test()
  this.cardService.getAllCards().subscribe(result => {
   // console.log(result);
    this.new = result['new'];
    this.inProgress = result['inProgress'];
    this.testing = result['testing'];
    this.approval = result['approval'];
    this.completed = result['completed'];
    this.setHeight();
  },
  error => {
    console.log("error")
  }
  );
}



openSubMenu({x,y}: MouseEvent, card, event){
  event.preventDefault();
  this.subMenuComponent.open({x,y},card);
}

  new: Card[] = [];
  inProgress: Card[] = [];
  testing: Card[] = [];
  approval: Card[] = [];
  completed: Card[] = [];

  private colHeight: number = 800; //default height


  cardList = []

  setHeight(){
    let longest = 0;
    let masterArray = [this.new,this.inProgress,this.testing,this.approval,this.completed];
    //First check what the longest 
    for(let array of masterArray){
        if(array.length > longest){
          longest = array.length;
        }
    }

    this.colHeight = longest * 108;
  }

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
          //Update the height after we move the card areas.
          this.setHeight();
        });
       
    }

  }





}
