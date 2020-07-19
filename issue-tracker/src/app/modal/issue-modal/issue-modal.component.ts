import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardService } from 'src/app/service/cardservice.service';
import { Card } from 'src/app/model/card';

@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.css']
})
export class IssueModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private cardService: CardService) { }

  card :Card = new Card();
  
  
  ngOnInit() {
    //Set defualt options if the card is new.
    if(this.card.type == undefined){
      this.card.type = "New Functionality"
      this.card.priority = 1;
      this.card.assignedUser = "Not Assigned"
    }
  }
  create(e){
     e.preventDefault();
     console.log(this.card);
     this.cardService.newCard(this.card).subscribe(result =>{
      console.log("FIRE!")
    });
    
  }

  close(e){
    this.activeModal.close();
  }

}
