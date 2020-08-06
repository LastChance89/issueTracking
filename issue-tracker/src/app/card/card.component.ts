import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../model/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTomainIssuePage(issueType, id){
    this.router.navigate(['/issue']);
  }

}
