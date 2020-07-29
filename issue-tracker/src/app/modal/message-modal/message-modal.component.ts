import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  private message: string; 
  private isError: boolean;


  ngOnInit() {
  }

  close(){
    this.activeModal.close();
  }

}
