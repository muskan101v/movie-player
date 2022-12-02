import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookiesService } from '../Service/cookies.service';

@Injectable({
  providedIn: 'root',
})
export class CheckcookiesGuard implements CanActivate {
  constructor(
    private readonly cookiesService: CookiesService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.cookiesService.checkCookies('genres')) {
      return true;
    }
    this.router.navigate(['/movies']);
    return false;
  }
}
