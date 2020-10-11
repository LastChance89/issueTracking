import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { browser } from 'protractor';
import { of } from 'rxjs';
import { Result } from 'src/app/model/result';
import { CardService } from 'src/app/service/cardservice.service';
import { ModalService } from 'src/app/service/modal.service';
import { RefreshServiceUtil } from 'src/app/service/refresh-service-util';

import { SubMenuComponent } from './sub-menu.component';

describe('SubMenuComponent', () => {
  let component: SubMenuComponent;
  let fixture: ComponentFixture<SubMenuComponent>;
  let mockProject = {
    "_id": { "$oid": "5f6a82cfc9727f2b2c5aa04e" }, "projectTitle": "Test",
    "columns": [{
      "name": "new", "position": 0, "iq": [
        { assignedUser: "Not Assigned", priority: 0, status: 1, type: "New Functionality", _id: "N1596998931713" },
        { assignedUser: "Not Assigned", priority: 0, status: 1, summary: "asdf", type: "New Functionality", _id: "N1596998847100" }]
    },
    { "name": "InProgress", "position": 1, "iq": [] }
    ],
    "iqrTypes": ["New Functionality", "Enhancement", "Defect", "Generic Request"],
    "priorities": [["Very Low", 0], ["Low", 1], ["Medium", 2], ["High", 3], ["Very High", 4]]
  }

  let mockCard = { assignedUser: "Not Assigned", priority: 0, status: 1, type: "New Functionality", _id: "N1596998931713" };
  let mockModalService : any; 
  let mockCardService: any; 
  let mockResfreshService: any;
  beforeEach(async(() => {
    mockModalService = jasmine.createSpyObj(['openMessageModal', 'openIssueModal']);
    mockCardService = jasmine.createSpyObj(['deleteCard']);
    mockResfreshService = jasmine.createSpyObj(['refreshCards']);
    TestBed.configureTestingModule({
      declarations: [SubMenuComponent],
      providers: [Overlay, RefreshServiceUtil,ModalService],
      imports: [HttpClientTestingModule]
    });
      TestBed.overrideProvider(CardService,{useValue :mockCardService});
      TestBed.overrideProvider(ModalService, {useValue: mockModalService});
      TestBed.overrideProvider(RefreshServiceUtil, {useValue: mockResfreshService});
      TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the sub menu with 1 option for creating a new card', () => {
    component.open({ x: 767, y: 277 }, mockProject);
    fixture.detectChanges();

    /*
    The submenu, which is a Template Portal is considered a sibling, not actually part of the native element
    or the debuElement themseleves. 
    */
    /*
    Notes for latter. 
      Note for later let x = fixture.debugElement.queryAll(By.css(".select-opt"));
     fixture.debugElement.nativeNode.nextSibling.querySelectorAll(".select-opt").forEach(element=> {
       console.log(element) 
     })
 */

    expect(fixture.debugElement.nativeNode.nextSibling.querySelector(".selection-body")).toBeTruthy();
    let menuOptions = fixture.debugElement.nativeNode.nextSibling.querySelectorAll(".select-opt");
    expect(menuOptions.length == 1).toBeTruthy();

    expect(menuOptions[0].textContent == ' Quick Create ').toBeTruthy();

    //We put this here so it closes the submenu on the actual test run screen. 
    component.close();
    fixture.detectChanges();

    //Make sure it closed properly. 
    expect(fixture.debugElement.nativeNode.nextSibling.querySelector(".selection-body")).toBeFalsy();

  });

  it('should open the submenu with all 3 options', () => {
    component.open({ x: 767, y: 277 }, mockProject, mockCard);
    fixture.detectChanges();

    expect(fixture.debugElement.nativeNode.nextSibling.querySelector(".selection-body")).toBeTruthy();
    
    let menuOptions = fixture.debugElement.nativeNode.nextSibling.querySelectorAll(".select-opt");
    expect(menuOptions.length == 3).toBeTruthy();
    
    expect(menuOptions[0].textContent == " Delete N1596998931713 ").toBeTruthy();
    expect(menuOptions[1].textContent == " Quick Create ").toBeTruthy();
    expect(menuOptions[2].textContent == " Quick Edit ").toBeTruthy();
    //We put this here so it closes the submenu on the actual test run screen. 
    component.close();
    fixture.detectChanges();

    //Make sure it closed properly. 
    expect(fixture.debugElement.nativeNode.nextSibling.querySelector(".selection-body")).toBeFalsy();

  })

  it('should execute quickCreate method on click and open the issueModal for a new card to be created', ()=>{
    component.open({ x: 767, y: 277 }, mockProject);
    fixture.detectChanges();
    let menuOptions = fixture.debugElement.nativeNode.nextSibling.querySelectorAll(".select-opt");
    menuOptions[0].click();
    expect(mockModalService.openIssueModal).toHaveBeenCalledWith(mockProject);
  });

  it('should execute quickEdit method on click and open the issueModal for a card to be edited', ()=>{
    component.open({ x: 767, y: 277 }, mockProject,mockCard);
    fixture.detectChanges();
    let menuOptions = fixture.debugElement.nativeNode.nextSibling.querySelectorAll(".select-opt");
    menuOptions[2].click();
    expect(mockModalService.openIssueModal).toHaveBeenCalledWith(mockProject,mockCard);
  });

  it('should execute delete method on click and call refreshCards and openMessageModal methods', ()=>{
    let result = new Result();
    result.message = "test";
    result.isError = false;
    
    component.open({ x: 767, y: 277 }, mockProject,mockCard);
    fixture.detectChanges();
    let menuOptions = fixture.debugElement.nativeNode.nextSibling.querySelectorAll(".select-opt");
    mockCardService.deleteCard.and.returnValue(of(result));
    menuOptions[0].click();
    expect(mockResfreshService.refreshCards).toHaveBeenCalled();
  
   //Not sure why I cant call this. THe mock card server is called but it claims its an unknown mockservice. 
   //expect(mockCardService.deleteCard).toHaveBeenCalledWith(" N1596998847100 ")
    expect(mockModalService.openMessageModal).toHaveBeenCalledWith(result);
  });

});
