import { Component, OnInit, Input, ViewContainerRef, TemplateRef, ViewChild, ElementRef, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { Card } from 'src/app/model/card';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CardService } from 'src/app/service/cardservice.service';
import { ModalService } from 'src/app/service/modal.service';
import { RefreshServiceUtil } from 'src/app/service/refresh-service-util';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],

})
export class SubMenuComponent implements OnInit {

  private card: Card;
  private project: Project;
  private overlayRef: OverlayRef;

  @ViewChild('subMenu',{static:true}) subMenuComponent: TemplateRef<ElementRef>;
  constructor(private overlay: Overlay,public viewContainerRef: ViewContainerRef, private cardService: CardService,
    private modalService: ModalService, private refreshService: RefreshServiceUtil){}

  ngOnInit() {
  }

  //---------------------------------------------------------------------------
  //sub menu control methods. 
  //---------------------------------------------------------------------------
  

  //Card is optional as we might not pass it, but due to changes in the component that calls it maybe remove it alltogeather?
  open({x,y}, project, card?) {
    //Close the last sub menu so we dont have multiple. 
    this.close();
    this.card = card;
    this.project = project;
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




  //---------------------------------------------------------------------------
  //sub menu functional methods. 
  //---------------------------------------------------------------------------
  
    
  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  delete(){
   this.cardService.deleteCard(this.card._id).subscribe( result =>{      

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
    this.modalService.openIssueModal(this.project);
  }

  quickEdit(){
    this.close();
    this.modalService.openIssueModal(this.project,this.card);
  }
  

}
