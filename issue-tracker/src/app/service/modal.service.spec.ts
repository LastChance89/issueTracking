import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from '../card/card.component';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
    })

    .compileComponents();
  }))

  it('should be created', () => {
    const service: ModalService = TestBed.get(ModalService);
    expect(service).toBeTruthy();
  });

  it('should open the openIssueModal', ()=>{

  });

});
