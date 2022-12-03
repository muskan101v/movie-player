import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private readonly cookieService: CookieService) {}

  setCookies(key: string, data: string): void {
    this.cookieService.set(key, data);
  }

  checkCookies(key: string): boolean {
    return this.cookieService.check(key);
  }
  getcookies(key: string): string {
    return this.cookieService.get(key);
  }
}
