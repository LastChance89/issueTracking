import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../model/card';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000';

  newCard(card: Card) : Observable<Card>{
    let payload = {"card" :card}
    return this.http.post<Card>(this.url+'/newCard',payload);
  }

  getAllCards(): Observable<Card[]>{
    return this.http.post<Card[]>(this.url+'/getAllCards','')
  }

  updateCard(requestId, requestStatus){
    let payload = {'id':requestId,'status':requestStatus};
    return this.http.post(this.url+'/updateIssueRequest',payload);
  }


}
