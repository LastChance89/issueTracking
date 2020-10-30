import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectMetaService{
  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000';

  getProjectMeta(): Observable<Project>{
    return this.http.post<Project>(this.url+"/projectMeta",'')
  }


}
