import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../model/card';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  constructor() { }

  cardTypes: String[] = ["New Functionality","Enhancement","Defect","Generic Request"]
  priorities = [["Very Low",0], ["Low",1], ["Medium",2],["High",3],["Very High",4]];
  statusTypes = [["New",0], ["In Progress",1],["Testing",2],["Approval",3],["Completed",4]];

  ngOnInit() {
  }

}
