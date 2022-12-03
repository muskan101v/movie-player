import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { MaterialModule } from '../material/material.module';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly movieService: MovieService
  ) {}
  allShows!: Observable<any>;
  tvShow!: Observable<any>;
  movies!: Observable<any>;
  query!: string;
  totalResults: number = 0;
  pageEvent!: PageEvent;
  hidePageSize = true;
  pageIndex = 0;
  height = 200;
  width = 250;
  data: any;
  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe({
      next: (res: Params) => {
        console.log(res?.['params']?.query);
        this.query = res?.['params']?.query;
        this.searchShow(this.query, 1);
      },
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.searchShow(this.query, this.pageIndex + 1);
  }

  searchShow(query: string, page: number) {
    this.allShows = this.movieService.search(page, query).pipe(
      // tap((res: any) => {
      //   console.log(res);
      // }),
      shareReplay()
    );

    this.allShows.subscribe((res) => {
      this.totalResults = res.total_results;
      this.data = res.results.filter(
        (res: any) => res.media_type == 'tv' || res.media_type == 'movie'
      );
    });

    this.tvShow = this.allShows.pipe(
      map((res: any) => res.results),
      map((res) => res.filter((res: any) => res.media_type == 'tv')),
      map((res) => res.length),
      tap((res: any) => {
        console.log(res);
      })
    );
    this.movies = this.allShows.pipe(
      map((res: any) => res.results),
      map((res) => res.filter((res: any) => res.media_type == 'movie')),
      map((res) => res.length),
      tap((res: any) => {
        console.log(res);
      })
    );
  }
}
