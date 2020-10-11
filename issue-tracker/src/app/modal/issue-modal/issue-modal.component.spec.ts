import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Project } from 'src/app/model/project';
import { Result } from 'src/app/model/result';
import { CardService } from 'src/app/service/cardservice.service';
import { RefreshServiceUtil } from 'src/app/service/refresh-service-util';

import { IssueModalComponent } from './issue-modal.component';

describe('IssueModalComponent', () => {
  let component: IssueModalComponent;
  let fixture: ComponentFixture<IssueModalComponent>;
  let mockCardService: any; 
  let mockModal: any;
  let mockRefreshServiceUtil: any;
  let  e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
  beforeEach(async(() => {
    mockCardService = jasmine.createSpyObj(['newCard','updateCard']);
    mockModal = jasmine.createSpyObj(['close']);
    mockRefreshServiceUtil = jasmine.createSpyObj(['refreshCards'])
    TestBed.configureTestingModule({
      declarations: [ IssueModalComponent ],
      imports: [FormsModule,HttpClientTestingModule],
      providers:[NgbActiveModal, RefreshServiceUtil, CardService]
    });
    TestBed.overrideProvider(CardService, {useValue: mockCardService});
    TestBed.overrideProvider(NgbActiveModal, {useValue: mockModal});
    TestBed.overrideProvider(RefreshServiceUtil,{useValue:mockRefreshServiceUtil })
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueModalComponent);
    component = fixture.componentInstance;
    component.setProject( new Project());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults when no card selected', ()=>{
    component.setupDefault();
    expect(component.getCard().type = "New Functionality").toBeTruthy();
    expect(component.getCard().priority == 0).toBeTruthy();
    expect(component.getCard().assignedUser == "Not Assigned").toBeTruthy();
    expect(component.getCard().status == 0).toBeTruthy();
    expect(component.isDisabled() ==true).toBeTruthy();
    expect(component.isUpdate() == false).toBeTruthy();
  });

  
  it('should create new card', ()=>{
    let result = new Result();
    result.message = "test";
    result.isError = false;
    
    mockCardService.newCard.and.returnValue(of(result));
    component.create(e);
    expect(mockModal.close).toHaveBeenCalledWith(result);
    expect(mockRefreshServiceUtil.refreshCards).toHaveBeenCalled();
  })
  it('should close the NgbActiveModal' , ()=>{
    component.close(e);0
    expect(mockModal.close).toHaveBeenCalled();
  })
  it('should update a card', ()=>{
    let result = new Result();
    result.message = "test";
    result.isError = false;
    mockCardService.updateCard.and.returnValue(of(result));
    component.updateCard();
    expect(mockModal.close).toHaveBeenCalledWith(result);
  })

});
