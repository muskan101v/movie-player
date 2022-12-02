import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipList } from '@angular/material/chips';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { CookiesService } from '../Service/cookies.service';
import { MovieService } from '../Service/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('chipList') chipList!: MatChipList;
  constructor(
    private readonly movieService: MovieService,
    private readonly cookieService: CookiesService,
    private readonly router: Router
  ) {}
  genres: Observable<any> | undefined;

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.genres = this.movieService.getGenres().pipe(
      map((res: any) => {
        let genres = res.genres.map((data: any) => {
          data['selected'] = false;
          return data;
        });
        return genres;
      })
    );
  }

  getSelectedChips() {
    // console.log(this.chipList.selected);
    let arr = Object.values(this.chipList.selected).map((res) => {
      return res['_value']['id'];
    });
    this.cookieService.setCookies('genres', arr.toString());
    this.router.navigate(['/movies']);
  }

  changeSelected(event: any, genre: any): void {
    genre.selected = event.selected;
  }
}
