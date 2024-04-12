import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPayPalModule } from 'ngx-paypal';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AllProductComponent } from './components/all-product/all-product.component';
import { ByCategoryComponent } from './components/by-category/by-category.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RateComponent } from './components/rate/rate.component';
import { SearchComponent } from './components/search/search.component';
import { SignFormComponent } from './components/sign-form/sign-form.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { ChatBotV2Component } from './components/chat-bot-v2/chat-bot-v2.component';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'all-product', component: AllProductComponent },
  { path: 'by-category/:id', component: ByCategoryComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'search/:keyword', component: SearchComponent },
  { path: 'search', component: AllProductComponent },
  { path: 'favorites', component: FavoriteComponent, canActivate: [AuthGuard] },
  { path: 'sign-form', component: SignFormComponent },
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    AllProductComponent,
    ByCategoryComponent,
    CartComponent,
    CheckoutComponent,
    NotFoundComponent,
    OrderDetailComponent,
    ProductDetailComponent,
    ProfileComponent,
    RateComponent,
    SearchComponent,
    SignFormComponent,
    ForgotPasswordComponent,
    FavoriteComponent,
    ContactComponent,
    AboutComponent,
    ChatBotComponent,
    ChatBotV2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    OrderModule,
    NgxPayPalModule,
    RouterModule.forRoot(routes), // Thêm routes vào RouterModule.forRoot()
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      progressAnimation: 'increasing',
      closeButton: true,
    }),
    SlickCarouselModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
