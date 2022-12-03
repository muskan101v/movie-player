import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ApiResponse, Shows } from '../models/models';
import { TvShowService } from '../services/tv-show.service';

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
  tvShows: Array<Shows> | undefined = [];
  totalResults!: number | undefined;
  pageEvent!: PageEvent;
  hidePageSize = true;
  pageIndex = 0;
  filter!: string;

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe((param: Params) => {
      this.filter = param?.['params']?.filter;
      this.filterShow(this.filter, 1);
      // console.log(this.filter);
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.filterShow(this.filter, this.pageIndex + 1);
  }

  getShows(page: number, showType: string) {
    this.showService.getShows(page, showType).subscribe((res: ApiResponse) => {
      this.totalResults = res?.total_results;
      this.tvShows = res?.results;
    });
  }

  filterShow(filter: string, page: number) {
    switch (filter) {
      case 'popular':
        this.getShows(page, 'popular');
        break;
      case 'airing Today':
        this.getShows(page, 'airing_today');
        break;
      case 'on TV':
        this.getShows(page, 'on_the_air');
        break;
      case 'top Rated':
        this.getShows(page, 'top_rated');
        break;
    }
  }
}
