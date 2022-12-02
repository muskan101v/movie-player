import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { MaterialModule } from '../material/material.module';
import { Movie } from '../models/models';
import { CookiesService } from '../Service/cookies.service';
import { MovieService } from '../Service/movie.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  standalone: true,
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  imports: [MaterialModule, CommonModule],
})
export class MovieComponent implements OnInit {
  constructor(
    private readonly movieService: MovieService,
    private readonly cookiesService: CookiesService,
    private readonly activateRoute: ActivatedRoute
  ) {}
  height = 200;
  width = 250;
  movie: Array<Movie> = [];
  totalResults!: number;
  getcookies!: string;
  pageEvent!: PageEvent;
  hidePageSize = true;
  pageIndex = 0;
  filter!: string;

  ngOnInit(): void {
    this.getcookies = this.cookiesService.getcookies('genres');
    this.activateRoute.queryParamMap.subscribe((res: any) => {
      this.filter = res.params.filter;
      // console.log(this.filter);
      this.filterMovie(this.filter, 1);
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.filterMovie(this.filter, this.pageIndex + 1);
  }

  recommended(page: number) {
    let payload = {
      api_key: env.apiKey,
      language: 'en - US ',
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page,
      with_watch_monetization_types: 'flatrate',
      with_genres: this.getcookies,
    };
    this.movieService.dicoverMovie(payload).subscribe((res) => {
      // console.log(res);
      this.totalResults = res.total_results;
      this.movie = res.results;
    });
  }

  getMovies(page: number, movieType: string) {
    this.movieService.getMovies(page, movieType).subscribe((res) => {
      // console.log(res);
      this.totalResults = res.total_results;
      this.movie = res.results;
    });
  }

  filterMovie(filter: string, page: number) {
    switch (filter) {
      case 'recommended':
        this.recommended(page);
        break;
      case 'top Rated':
        this.getMovies(page, 'top_rated');
        break;
      case 'popular':
        this.getMovies(page, 'popular');
        break;
      case 'now-playing':
        this.getMovies(page, 'now_playing');
        break;
      case 'upcoming':
        this.getMovies(page, 'upcoming');
        break;
    }
  }
}
