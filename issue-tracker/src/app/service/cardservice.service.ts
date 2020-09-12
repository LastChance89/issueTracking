import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../model/card';
import { Observable } from 'rxjs';
import { Result } from '../model/result';
import { Column } from '../model/column';



@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000';

  newCard(card: Card) : Observable<Result>{
    let payload = {"card" :card}
    return this.http.post<Result>(this.url+'/newCard',payload);
  }

  getAllCards(): Observable<Column[]>{
    return this.http.post<Column[]>(this.url+'/getAllCards','')
  }

  updateCardStatus(requestId, requestStatus){
    let payload = {'id':requestId,'status':requestStatus};
    return this.http.post(this.url+'/updateIssueRequestStatus',payload);
  }

  updateCard(card: Card){
    let payload = {'card':card}
    return this.http.post<Result>(this.url+'/updateIssueRequest',payload);
  }
  

  deleteCard(requestId){
    console.log(requestId);
    let payload = {'id': requestId};
    return this.http.post<Result>(this.url+'/deleteIssue',payload);
  }

}
