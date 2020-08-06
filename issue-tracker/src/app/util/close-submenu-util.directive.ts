import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[closeSubMenu]'
})
export class CloseSubMenuUtil {
  constructor(private eleRef: ElementRef) {}


  @Output() closeSubMenu = new EventEmitter();
  
  @HostListener('document:click',['$event.target'])
  public onClick(target){
    if(!this.eleRef.nativeElement.contains(target)){
      this.closeSubMenu.emit();
    }
  }
}
