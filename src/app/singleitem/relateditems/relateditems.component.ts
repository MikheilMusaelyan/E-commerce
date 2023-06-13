import { Component } from '@angular/core';

@Component({
  selector: 'app-relateditems',
  templateUrl: './relateditems.component.html',
  styleUrls: ['./relateditems.component.css']
})
export class RelateditemsComponent {
  images = [
    'https://upload.wikimedia.org/wikipedia/commons/8/85/Qtz_watch.png',
    'https://www.pngall.com/wp-content/uploads/2/Rolex-Watch-PNG-Free-Image.png',
    'https://upload.wikimedia.org/wikipedia/commons/c/cc/Arcadia_watch_c_1950.png',
    'https://cdn.discordapp.com/attachments/1008571121743962212/1117567493666513047/rustavi_2_beautiful_tall_white_skinny_22_year_old_girl_model_fa_596b25fc-4e23-478e-99f5-022c115753e6.png',
    // 'https://cdn.discordapp.com/attachments/1008571121743962212/1117564117084029082/rustavi_2_beautiful_tall_white_skinny_22_year_old_girl_model_fa_4eb55e22-1173-4d20-aa98-bc05b3c1b17c.png',
  ]
  goToItem(item:any){

  }
}
