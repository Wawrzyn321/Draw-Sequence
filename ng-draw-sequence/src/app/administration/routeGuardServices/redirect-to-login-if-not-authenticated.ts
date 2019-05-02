import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectToLoginIfNotAuthenticatedService implements CanActivate  {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
