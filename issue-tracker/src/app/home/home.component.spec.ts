import { DragDropModule } from '@angular/cdk/drag-drop';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { SubMenuComponent } from '../modal/sub-menu/sub-menu.component';
import { CardService } from '../service/cardservice.service';
import { ModalService } from '../service/modal.service';
import { RefreshServiceUtil } from '../service/refresh-service-util';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockCardService: any;
  let mockProject = {
    "_id": { "$oid": "5f6a82cfc9727f2b2c5aa04e" }, "projectTitle": "Test",
    "columns": [{
      "name": "new", "position": 0, "iq": [
        { assignedUser: "Not Assigned", priority: 0, status: 1, type: "New Functionality", _id: "N1596998931713" },
        { assignedUser: "Not Assigned", priority: 0, status: 1, summary: "asdf", type: "New Functionality", _id: "N1596998847100" }]},
    {"name": "InProgress", "position": 1, "iq": []}
  ],
    "iqrTypes": ["New Functionality", "Enhancement", "Defect", "Generic Request"],
    "priorities": [["Very Low", 0], ["Low", 1], ["Medium", 2], ["High", 3], ["Very High", 4]]
  }

  beforeEach(async(() => {
    mockCardService = jasmine.createSpyObj(['getAllCards', 'updateCardStatus']);
    TestBed.configureTestingModule({
      declarations: [HomeComponent, SubMenuComponent, CardComponent],
      imports: [DragDropModule, HttpClientTestingModule,RouterTestingModule],
      providers: [CardService, ModalService, RefreshServiceUtil, Overlay]
    });
    TestBed.overrideProvider(CardService, { useValue: mockCardService });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockCardService.getAllCards.and.returnValue(of(mockProject));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup cards', () => {
    mockCardService.getAllCards.and.returnValue(of(mockProject));
    component.setupCards();
    expect(component.getProject().projectTitle == "Test").toBeTruthy();
  })  

  //Note: Cannot test default because there is no screen height, and its going to just be set to 0. 
  it('should setup height of the page', () => {
    component.setHeight();
    expect(component.getHeight() == 216).toBeTruthy();
  })




});
