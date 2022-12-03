import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { concatMap, from, map, Observable, take, tap } from 'rxjs';
import { ApiResponse, Genres, Shows, slider } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private readonly http: HttpClient) {}

  getGenres(): Observable<Genres> {
    return this.http
      .get<Genres>(`${env.baseUrl}/genre/movie/list`, {
        params: {
          api_key: env.apiKey,
          language: 'en - US',
        },
      })
      .pipe(
        tap((res: Genres) => {
          console.log(res);
        })
      );
  }

  upcommingMovies(page: number = 1): Observable<slider[]> {
    return this.getMovies(page, 'upcoming').pipe(
      map((res) => {
        let image = res.results.slice(0, 5).map((res: Shows) => {
          let images = {
            image: res?.backdrop_path,
            thumbImage: res?.backdrop_path,
          };
          return images;
        });
        return image;
      })
    );
    // return this.http
    //   .get(`${env.baseUrl}/movie/upcoming`, {
    //     params: {
    //       api_key: env.apiKey,
    //       language: 'en- US',
    //       page,
    //     },
    //   })
    //   .pipe(
    //     tap((res) => {
    //       console.log(res);
    //     }),
    //     concatMap((res: any) => {
    //       let arr = [];
    //       arr.push(this.getData(res.results));
    //       return arr;
    //     })
    //   );
  }

  dicoverMovie(payload: any): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${env.baseUrl}/discover/movie`, {
        params: payload,
      })
      .pipe(
        map((res: ApiResponse) => {
          res.results.map((res: Shows) => {
            return this.convertImagePath(res);
          });
          return res;
        })
      );
  }

  getMovies(page: number, movieType: string): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${env.baseUrl}/movie/${movieType}`, {
        params: {
          api_key: env.apiKey,
          language: 'en - US',
          page: page,
        },
      })
      .pipe(
        map((res: ApiResponse) => {
          res.results.map((res: Shows) => {
            return this.convertImagePath(res);
          });
          return res;
        })
      );
  }

  search(page: number, query: string): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${env.baseUrl}/search/multi`, {
        params: {
          api_key: env.apiKey,
          language: 'en - US',
          page,
          include_adult: false,
          query,
        },
      })
      .pipe(
        map((res: ApiResponse) => {
          res.results.map((res: Shows) => {
            return this.convertImagePath(res);
          });
          return res;
        })
      );
  }

  convertImagePath(res: Shows) {
    if (res.hasOwnProperty('name')) {
      res['title'] = res['name'];
    }
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
      res['poster_path'] = `https://image.tmdb.org/t/p/w500${res.poster_path}`;
    }

    return res;
  }

  // getData(results: any) {
  //   return from(results).pipe(
  //     take(5),
  //     map((res: any) => {
  //       let images = {
  //         image: `https://image.tmdb.org/t/p/w500${res.backdrop_path}`,
  //         thumbImage: `https://image.tmdb.org/t/p/w500${res.backdrop_path}`,
  //       };
  //       return images;
  //     })
  //   );
  // }
}
