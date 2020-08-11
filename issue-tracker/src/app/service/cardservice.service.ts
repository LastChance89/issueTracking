import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../model/card';
import { Observable } from 'rxjs';
import { Result } from '../model/result';



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

  getAllCards(): Observable<any>{
    return this.http.post<any>(this.url+'/getAllCards','')
  }

  updateCard(requestId, requestStatus){
    let payload = {'id':requestId,'status':requestStatus};
    return this.http.post(this.url+'/updateIssueRequest',payload);
  }

  deleteCard(requestId){
    console.log(requestId);
    let payload = {'id': requestId};
    return this.http.post<Result>(this.url+'/deleteIssue',payload);
  }

}
