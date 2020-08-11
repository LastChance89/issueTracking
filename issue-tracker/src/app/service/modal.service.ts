import { Injectable } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IssueModalComponent } from '../modal/issue-modal/issue-modal.component';
import { MessageModalComponent } from '../modal/message-modal/message-modal.component';
import { Result } from '../model/result';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal) { }

  private result: Result;
  
  options: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    size: "dialog-centered"
  };
  

  openIssueModal(){
    const modalRef = this.ngbModal.open(IssueModalComponent, this.options);
    modalRef.result.then((data)=>{
      //Data undefined means weve just closed the modal. 
      if(data != undefined  && data != null){
        const messageRef = this.ngbModal.open(MessageModalComponent, this.options);
        messageRef.componentInstance.result = data;
      }
    })
  }

  openMessageModal(result: Result){
    const modalRef = this.ngbModal.open(MessageModalComponent,this.options);
    modalRef.componentInstance.result = result;
  }

}
