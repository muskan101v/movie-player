import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { concatMap, from, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private readonly http: HttpClient) {}

  getGenres() {
    return this.http.get(`${env.baseUrl}/genre/movie/list`, {
      params: {
        api_key: env.apiKey,
        language: 'en - US',
      },
    });
  }

  upcommingMovies(page: number = 1) {
    return this.http
      .get(`${env.baseUrl}/movie/upcoming`, {
        params: {
          api_key: env.apiKey,
          language: 'en- US',
          page,
        },
      })
      .pipe(
        concatMap((res: any) => {
          let arr = [];
          arr.push(this.getData(res.results));
          return arr;
        })
      );
  }

  dicoverMovie(payload: any) {
    return this.http
      .get(`${env.baseUrl}/discover/movie`, {
        params: payload,
      })
      .pipe(
        map((res: any) => {
          res.results.map((res: any) => {
            res[
              'backdrop_path'
            ] = `https://image.tmdb.org/t/p/w500${res.backdrop_path}`;
            res[
              'poster_path'
            ] = `https://image.tmdb.org/t/p/w500${res.poster_path}`;

            return res;
          });
          return res;
        })
      );
  }

  getMovies(page: number, movieType: string) {
    return this.http
      .get(`${env.baseUrl}/movie/${movieType}`, {
        params: {
          api_key: env.apiKey,
          language: 'en - US',
          page: page,
        },
      })
      .pipe(
        map((res: any) => {
          res.results.map((res: any) => {
            res[
              'backdrop_path'
            ] = `https://image.tmdb.org/t/p/w500${res.backdrop_path}`;
            res[
              'poster_path'
            ] = `https://image.tmdb.org/t/p/w500${res.poster_path}`;

            return res;
          });
          return res;
        })
      );
  }

  getData(results: any) {
    return from(results).pipe(
      take(5),
      map((res: any) => {
        let images = {
          image: `https://image.tmdb.org/t/p/w500${res.backdrop_path}`,
          thumbImage: `https://image.tmdb.org/t/p/w500${res.backdrop_path}`,
        };
        return images;
      })
    );
  }

  search(page: number, query: string) {
    return this.http
      .get(`https://api.themoviedb.org/3/search/multi`, {
        params: {
          api_key: env.apiKey,
          language: 'en - US',
          page,
          include_adult: false,
          query,
        },
      })
      .pipe(
        map((res: any) => {
          res.results.map((res: any) => {
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
