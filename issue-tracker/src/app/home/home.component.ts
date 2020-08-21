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
  private inProgress: Card[] = [];
  private testing: Card[] = [];
  private approval: Card[] = [];
  private completed: Card[] = [];
  private cardList = []

  private currCard : Card;
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

  /*
  If we click a card, we set the current card we have clicked. This is because 
  in order to have a sub menu with varying options within the entire card area, 
  we cant just put the open sub menu on the  card and the area otherwise we end up with 2 
  menu's poping up. This way, right click on the card, and then the second call endsup calling 
  the actual open menu method, openSubMenu 
  */
  setCurrentCard( card ) {
    event.preventDefault();
    this.currCard = card;
    
  }

  /*
  This sits on the top level DIV, that way where we click within the grid, 
  we can then open various sub menu options. 
  We then pass the current card into the sub menu component in order to display the card, if its not 
  undefined.  
  */
  openSubMenu({ x, y }: MouseEvent, event ) {
    event.preventDefault();

    this.subMenuComponent.open({ x, y }, this.currCard);
    this.currCard = undefined;
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

      this.cardService.updateCardStatus(cardID, cardStatus).subscribe(result => {
        //Update the height after we move the card across status's.
        this.setHeight();
      });
    }
  }
}
