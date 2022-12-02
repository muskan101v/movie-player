import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgOptimizedImage } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TvShowComponent } from './tv-show/tv-show.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MovieComponent,
    TvShowComponent,
    SearchComponent,
    AppRoutingModule,
    HttpClientModule,
    NgImageSliderModule,
    NgOptimizedImage,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
