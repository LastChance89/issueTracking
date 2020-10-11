import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Card } from '../model/card';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let card: Card;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      imports:[ RouterTestingModule,HttpClientTestingModule]
    })

    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = new Card()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
