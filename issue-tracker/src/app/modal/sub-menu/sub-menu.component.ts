import { Component, OnInit, Input, ViewContainerRef, TemplateRef, ViewChild, ElementRef, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { Card } from 'src/app/model/card';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],

})
export class SubMenuComponent implements OnInit {

  private card: Card;
  private overlayRef: OverlayRef;

  @ViewChild('subMenu',{static:true}) subMenuComponent: TemplateRef<ElementRef>;
  constructor(private overlay: Overlay,public viewContainerRef: ViewContainerRef)
   {}

  ngOnInit() {
  }


  open({x,y}, card) {
    console.log(this.subMenuComponent.elementRef);
    this.card = card;
    //Close the last sub menu so we dont have multiple. 
    this.close();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
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
   this.close(); 
  }


}
