import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardService } from 'src/app/service/cardservice.service';
import { Card } from 'src/app/model/card';
import { RefreshServiceUtil } from 'src/app/service/refresh-service-util';



@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.css']
})
export class IssueModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private cardService: CardService, private refreshService: RefreshServiceUtil) { }

  private card :Card = new Card();
  private disable: Boolean = false;
  private update: Boolean = true;

  //Move these to metadata? load and cache? admin functionality maybe to update on fly. 
  //How customizeable do I feel like making this. 
  //Need to look at how I should handle MongoDB setup. 
  cardTypes: String[] = ["New Functionality","Enhancement","Defect","Generic Request"]
  priorities = [["Very Low",0], ["Low",1], ["Medium",2],["High",3],["Very High",4]];
  statusTypes = [["New",0], ["In Progress",1],["Testing",2],["Approval",3],["Completed",4]];

  ngOnInit() {
    //Set defualt options if the card is new.
    if(this.card.type == undefined){
      this.card.type = "New Functionality"
      this.card.priority = 0;
      this.card.assignedUser = "Not Assigned"
      this.card.status = 0;
      this.disable = false;
      this.update = false;
    }
  }
  create(e){
    e.preventDefault();
    this.cardService.newCard(this.card).subscribe(result =>{
      this.activeModal.close(result);
      this.refreshService.refreshCards();
    },
    error =>{
      return error;
    });
    
  }

  close(e){
    this.activeModal.close();
  }
  updateCard(){
    this.cardService.updateCard(this.card).subscribe(result=>{
    })
  }
}

/*
Defect: 
Reported by Internal, External 
Reporter: Reporter Object has fields Name, contact information (phone, email address), 
project 
defect area 
Assigned release: TBD, Version number. Drop down based on metadata? Pathc Number?
Assignee: Gotta create a drop down list of users. 
Summary

New Functionality:
Project
Assignee 
Assigned release 


Enhacnement: 
Project
Assignee 
Assigned release

General Request: 
standard fields only. 

Service Request: 
Reporter: Reporter Object has fields Name, contact information (phone, email address)
Service Request : Account unlock, Data Restore, Deletion request, etc....
Assignee 

*/