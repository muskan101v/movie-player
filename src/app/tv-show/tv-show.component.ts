import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { TvShowService } from '../Service/tv-show.service';

@Component({
  selector: 'app-tv-show',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss'],
})
export class TvShowComponent implements OnInit {
  constructor(
    private readonly showService: TvShowService,
    private readonly activateRoute: ActivatedRoute
  ) {}
  height = 200;
  width = 200;
  tvShows: Array<any> = [];
  totalResults!: number;
  pageEvent!: PageEvent;
  hidePageSize = true;
  pageIndex = 0;
  filter!: string;

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe((res: any) => {
      this.filter = res.params.filter;
      this.filterShow(this.filter);
      // console.log(this.filter);
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    switch (this.filter) {
      case 'popular':
        this.getShows(this.pageIndex + 1, 'popular');
        break;
      case 'airing Today':
        this.getShows(this.pageIndex + 1, 'airing_today');
        break;
      case 'on TV':
        this.getShows(this.pageIndex + 1, 'on_the_air');
        break;
      case 'top Rated':
        this.getShows(this.pageIndex + 1, 'top_rated');
        break;
    }
  }

  getShows(page: number, showType: string) {
    this.showService.getShows(page, showType).subscribe((res) => {
      // console.log(res);
      this.totalResults = res.total_results;
      this.tvShows = res.results;
    });
  }

  filterShow(filter: string) {
    switch (filter) {
      case 'popular':
        this.getShows(1, 'popular');
        break;
      case 'airing Today':
        this.getShows(1, 'airing_today');
        break;
      case 'on TV':
        this.getShows(1, 'on_the_air');
        break;
      case 'top Rated':
        this.getShows(1, 'top_rated');
        break;
    }
  }
}
