import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ViewChildren, QueryList, ContentChild, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Card } from '../model/card';
import { CardService } from '../service/cardservice.service';
import { SubMenuComponent } from '../modal/sub-menu/sub-menu.component';
import { ModalService } from '../service/modal.service';
import { RefreshServiceUtil } from '../service/refresh-service-util';
import { Column } from '../model/column';

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
 
  //Project Columns used for front end rendering and project card distrabution. 
  private projectColumns: Column[];
  //keep but need to figure out why. 
  private cardList = []

  private currCard : Card;
  private colHeight: number = 800; //default height
  private defHeight = 0;

  ngOnInit() {
    this.defHeight =document.getElementById("container").scrollHeight -50;
    this.setupCards();
  }

  setupCards() {
    this.cardService.getAllCards().subscribe(result => {
      this.projectColumns = result;
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
    //First check what the longest 
    for (let array of this.projectColumns) {
      if (array.iq.length > longest) {
        longest = array.iq.length;
      }
    } 
    let useHeight = longest *108;
    this.colHeight = this.defHeight > useHeight ? this.defHeight : useHeight;
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
      
      for(let column of this.projectColumns){
        if(column.name == event.container.element.nativeElement.id){
          cardStatus = column.position;
          }
      }
      this.cardService.updateCardStatus(cardID, cardStatus).subscribe(result => {
        //Update the height after we move the card across status's.
        this.setHeight();
      });
    }
  }
}
