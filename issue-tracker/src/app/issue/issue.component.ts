import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../model/card';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  constructor() { }

  @Input() issue: Card;


  ngOnInit() {
  }

}
