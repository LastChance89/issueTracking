import { Component, OnInit, Input, ViewContainerRef, TemplateRef, ViewChild, ElementRef, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { Card } from 'src/app/model/card';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription, fromEvent } from 'rxjs';
import { CardService } from 'src/app/service/cardservice.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],

})
export class SubMenuComponent implements OnInit {

  private card: Card;
  private overlayRef: OverlayRef;

  @ViewChild('subMenu',{static:true}) subMenuComponent: TemplateRef<ElementRef>;
  constructor(private overlay: Overlay,public viewContainerRef: ViewContainerRef, private cardService: CardService)
   {}

  ngOnInit() {
  }

  open({x,y}, card) {
    this.card = card;
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

  delete(){
   this.cardService.deleteCard(this.card._id).subscribe( result =>{
      //if sucsess: display sucsess message then ok and close. 
      //else: Error message and then close. 
      console.log(result);
   },
   error=>{
     console.log(error);
   })
   this.close(); 
  }

}
