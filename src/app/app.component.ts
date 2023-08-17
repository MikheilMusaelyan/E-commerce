import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commerce';
  showNavbar: boolean = true;
  showFooter: boolean = true;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showNavbar = !this.activatedRoute.firstChild?.snapshot.data['hideNavbar'];
        this.showFooter = !this.activatedRoute.firstChild?.snapshot.data['hideFooter'];
      });
  }
}
