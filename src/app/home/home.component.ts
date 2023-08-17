import { Component, OnInit } from '@angular/core';
import { Item, MainService } from '../main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private service: MainService){}
  items: Item[] = this.service.items;

  
}
