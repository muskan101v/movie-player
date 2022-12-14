import { Component, OnInit } from '@angular/core';
import { concatMap, forkJoin, from, map, Observable, take } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { Shows, slider } from '../models/models';
import { Router } from '@angular/router';
import { CookiesService } from '../services/cookies.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
    private readonly movieService: MovieService,
    private readonly router: Router,
    private readonly cookiesService: CookiesService
  ) {}
  // upcomingMovie!: Observable<any>;
  imageObject: Array<slider> = [];
  recommendedMovie: Array<Shows> = [];
  latestmovie: Array<Shows> | undefined = [];

  ngOnInit(): void {
    let getcookies = this.cookiesService.getcookies('genres');
    // this.upcomingmovie();
    let payload = {
      api_key: env.apiKey,
      language: 'en - US ',
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page: 1,
      with_watch_monetization_types: 'flatrate',
      with_genres: getcookies,
    };

    forkJoin([
      this.movieService.upcommingMovies(),
      this.movieService.dicoverMovie(payload),
      this.movieService.getMovies(1, 'top_rated'),
    ]).subscribe({
      next: ([upcomingMovie, recommendedMovie, latestmovie]) => {
        console.log(upcomingMovie);
        this.imageObject = upcomingMovie;
        this.recommendedMovie = recommendedMovie.results;
        this.latestmovie = latestmovie?.results;
        // console.log(upcomingMovie);
        // upcomingMovie.subscribe((data) => {
        //   this.imageObject.push(data);
        //   console.log(this.imageObject);
        // });
      },
    });
  }

  // upcomingmovie() {
  //   this.movieService.upcommingMovies().subscribe({
  //     next: (res: any) => {
  //       // this.imageObject.push(res);
  //     },
  //   });
  // }

  onView(movie: string) {
    this.router.navigate(['/movie'], { queryParams: { filter: movie } });
  }
}
