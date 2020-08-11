import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ViewChildren, QueryList, ContentChild, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Card } from '../model/card';
import { CardService } from '../service/cardservice.service';
import { SubMenuComponent } from '../modal/sub-menu/sub-menu.component';
import { ModalService } from '../service/modal.service';
import { RefreshServiceUtil } from '../service/refresh-service-util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cardService: CardService, private modalService: ModalService, private refreshService: RefreshServiceUtil) {
    this.refreshService.changeEmitted$.subscribe(result=>{
      this.setupCards();
    })
   }

  @ViewChild(SubMenuComponent, { static: true }) subMenuComponent: SubMenuComponent;
  private new: Card[] = [];
  inProgress: Card[] = [];
  testing: Card[] = [];
  approval: Card[] = [];
  completed: Card[] = [];
  cardList = []


  private colHeight: number = 800; //default height




  ngOnInit() {
    this.setupCards();
  }

  setupCards() {
    this.cardService.getAllCards().subscribe(result => {
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


  openSubMenu({ x, y }: MouseEvent, event, card? ) {
    event.preventDefault();
    this.subMenuComponent.open({ x, y }, card);
  }
  

  setHeight() {
    let longest = 0;
    let masterArray = [this.new, this.inProgress, this.testing, this.approval, this.completed];
    //First check what the longest 
    for (let array of masterArray) {
      if (array.length > longest) {
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

      switch (event.container.element.nativeElement.id) {
        case "inp":
          cardStatus = 1;
          break;
        case "test":
          cardStatus = 2;
          break;
        case "aprov":
          cardStatus = 3;
          break;
        case "complete":
          cardStatus = 4;
          break;
        default: //new status is default. 
          cardStatus = 0;
          break;
      }

      this.cardService.updateCard(cardID, cardStatus).subscribe(result => {
        //Update the height after we move the card across status's.
        this.setHeight();
      });
    }
  }
}
