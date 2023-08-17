import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { AppComponent } from './app.component';
import { SingleitemComponent } from './singleitem/singleitem.component';
import { BannerComponent } from './banner/banner.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent, data: { hideNavbar: true, hideFooter: true } },
  { path: 'cart', component: CartComponent },
  { path: 'item/:id', component: SingleitemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }