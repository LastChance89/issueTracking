import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardService } from 'src/app/service/cardservice.service';
import { Card } from 'src/app/model/card';
import { RefreshServiceUtil } from 'src/app/service/refresh-service-util';
import { Project } from 'src/app/model/project';



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
  private project: Project;

  ngOnInit() {
    //Set defualt options if the card is new.
    this.setupDefault();
  }

  setupDefault(){
    if(this.card.type == undefined){
      this.card.type = "New Functionality"
      this.card.priority = 0;
      this.card.assignedUser = "Not Assigned"
      this.card.status = 0;
      this.disable = false; 
      this.update = false;
    }
    else{
      this.disable = true;
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
      this.activeModal.close(result);
    })
  }
/*
----------------------------------------------------------------
Methods for testing purposes. 
----------------------------------------------------------------
*/
  setProject(project){
    this.project = project;
  }
  getProject(){
    return this.project;
  }
  getCard(){
    return this.card;
  }
  isDisabled(){
    return this.disable;
  }
  isUpdate(){
    return this.update;
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