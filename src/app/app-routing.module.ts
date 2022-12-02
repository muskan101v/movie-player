import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckcookiesGuard } from './guards/checkcookies.guard';
import { GenresGuard } from './guards/genres.guard';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [CheckcookiesGuard] },
  { path: 'movies', component: LandingComponent, canActivate: [GenresGuard] },
  {
    path: 'movie',
    loadComponent: () =>
      import('./movie/movie.component').then((e) => e.MovieComponent),
    canActivate: [GenresGuard],
  },
  {
    path: 'tv-show',
    loadComponent: () =>
      import('./tv-show/tv-show.component').then((e) => e.TvShowComponent),
    canActivate: [GenresGuard],
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./search/search.component').then((e) => e.SearchComponent),
    canActivate: [GenresGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
