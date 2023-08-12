import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { SingleitemComponent } from './singleitem/singleitem.component';
import { RelateditemsComponent } from './singleitem/relateditems/relateditems.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { FooterComponent } from './footer/footer.component';
import { NgxStripeModule } from 'ngx-stripe';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    SingleitemComponent,
    RelateditemsComponent,
    NavbarComponent,
    BannerComponent,
    ReviewsComponent,
    FooterComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxStripeModule.forRoot('pk_live_51Ncg8GKpdNph4sQR7z0fQbY0AngQSShhlDGCFDX7YOJijYj5aPxs9YB1yhcpDdHnImRBI7ubQy5lZgXu3vnnbrG100GUlJEh3c'), // Test/Live key
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
