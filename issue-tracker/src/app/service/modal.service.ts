import { Injectable } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IssueModalComponent } from '../modal/issue-modal/issue-modal.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal) { }

  
  options: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    size: "dialog-centered"
  };
  

  openIssueModal(){
    const modalRef = this.ngbModal.open(IssueModalComponent, this.options)
  }

}
