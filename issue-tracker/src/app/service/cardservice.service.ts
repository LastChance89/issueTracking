import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../model/card';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  newCard(card: Card){
    let payload = {"card" :card}
    return this.http.post('http://localhost:3000/newCard',payload);
  }


}
