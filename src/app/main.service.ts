import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root',
})

export class MainService {
  constructor(private http: HttpClient) {} 

  createCustomer(data: any){
    return this.http.post('http://localhost:3000/create-customer', data);
  }

  StartSubscription(data: any) {
    return this.http.post('http://localhost:3000/create-subscription', data);
  }

  sendMail(data: any) {
    return this.http.post('http://localhost:3000/send-email', data);
  }

  
}