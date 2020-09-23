import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIqrComponent } from './new-iqr.component';

describe('NewIqrComponent', () => {
  let component: NewIqrComponent;
  let fixture: ComponentFixture<NewIqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
