import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Card } from './model/card';
import{CardService} from './service/cardservice.service'
import { ModalService } from './service/modal.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private cardService: CardService, private modalService: ModalService){}

  private newCard = new Subject<Card>(); 
  changedEmmitted$ = this.newCard.asObservable();

  createNewIssue(e){
    e.preventDefault;
    this.modalService.openIssueModal();
  }




}
