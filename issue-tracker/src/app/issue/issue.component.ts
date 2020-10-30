import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../model/card';
import { Project } from '../model/project';
import { ProjectMetaService } from '../service/project-meta.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  private project: Project;

  constructor(private projectMetaService: ProjectMetaService) { }


  ngOnInit() {
    this.projectMetaService.getProjectMeta().subscribe(result =>{
      this.project = result;
      console.log(this.project.columns)
    }
    );
  }

}
