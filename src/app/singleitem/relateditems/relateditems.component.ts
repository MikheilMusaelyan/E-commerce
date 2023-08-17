import { Component, Input } from '@angular/core';
import { Item, MainService } from 'src/app/main.service';

@Component({
  selector: 'app-relateditems',
  templateUrl: './relateditems.component.html',
  styleUrls: ['./relateditems.component.css']
})
export class RelateditemsComponent {
  constructor(private service: MainService){}
  @Input('id') id: number;
  items: Item[] = this.service.items;

  ngOnInit(){
    this.items = this.items.filter(item => item['id'] != this.id)
  }
}
