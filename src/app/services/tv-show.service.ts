import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { ApiResponse, Shows } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TvShowService {
  constructor(private readonly http: HttpClient) {}

  getShows(page: number, showType: string): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`https://api.themoviedb.org/3/tv/${showType}`, {
        params: {
          api_key: env.apiKey,
          language: 'en - US',
          page: page,
        },
      })
      .pipe(
        tap((res: ApiResponse) => {
          console.log(res);
        }),
        map((res: ApiResponse) => {
          res.results?.map((res: Shows) => {
            if (!res['backdrop_path']) {
              res['backdrop_path'] = `../../assets/images/backdrop.jpeg`;
            } else {
              res[
                'backdrop_path'
              ] = `https://image.tmdb.org/t/p/w500${res.backdrop_path}`;
            }
            if (!res['poster_path']) {
              res['poster_path'] = `../../assets/images/backdrop.jpeg`;
            } else {
              res[
                'poster_path'
              ] = `https://image.tmdb.org/t/p/w500${res.poster_path}`;
            }

            return res;
          });
          return res;
        })
      );
  }
}
