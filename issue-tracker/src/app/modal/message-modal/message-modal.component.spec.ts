import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from 'src/app/model/result';

import { MessageModalComponent } from './message-modal.component';

describe('MessageModalComponent', () => {
  let component: MessageModalComponent;
  let fixture: ComponentFixture<MessageModalComponent>;
  let result: Result;
  let mockNgbActiveModal: any;
  beforeEach(async(() => {
    mockNgbActiveModal = jasmine.createSpyObj(['close']);
    TestBed.configureTestingModule({
      declarations: [ MessageModalComponent ],
      providers:[NgbActiveModal]
    });
    TestBed.overrideProvider(NgbActiveModal, {useValue:mockNgbActiveModal});
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageModalComponent);
    component = fixture.componentInstance;
    component.result = new Result();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should close the model',()=>{
    component.close();
    expect(mockNgbActiveModal.close).toHaveBeenCalled();
  })
});
