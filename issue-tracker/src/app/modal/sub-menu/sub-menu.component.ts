import { Component, OnInit, Input, ViewContainerRef, TemplateRef, ViewChild, ElementRef, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { Card } from 'src/app/model/card';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CardService } from 'src/app/service/cardservice.service';
import { ModalService } from 'src/app/service/modal.service';
import { RefreshServiceUtil } from 'src/app/service/refresh-service-util';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],

})
export class SubMenuComponent implements OnInit {

  private card: Card;
  private overlayRef: OverlayRef;

  @ViewChild('subMenu',{static:true}) subMenuComponent: TemplateRef<ElementRef>;
  constructor(private overlay: Overlay,public viewContainerRef: ViewContainerRef, private cardService: CardService,
    private modalService: ModalService, private refreshService: RefreshServiceUtil)
   {}

  ngOnInit() {
  }

  open({x,y}, card?) {
    if(card != undefined){
      this.card = card;
    }
    //Close the last sub menu so we dont have multiple. 
    this.close();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'center',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
    });

    this.overlayRef.attach(new TemplatePortal(this.subMenuComponent, this.viewContainerRef));
  }


  
  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  //---------------------------------------------------------------------------
  //sub menu methods. 
  //---------------------------------------------------------------------------
  
  delete(){
   this.cardService.deleteCard(this.card._id).subscribe( result =>{      
      
      //if sucsess: display sucsess message then ok and close. 
      //else: Error message and then close. 
      this.refreshService.refreshCards();
      this.modalService.openMessageModal(result);
   },
   error=>{
     console.log(error);
   })
   this.close(); 
  }
  
  quickCreate(){
    this.close();
    this.modalService.openIssueModal();
  }

}
