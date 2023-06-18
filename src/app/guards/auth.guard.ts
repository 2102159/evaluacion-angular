import { TestBed } from '@angular/core/testing';
import { CanActivateFn, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      let isLoggedIn = this.authService.isAuthenticated();
      if (isLoggedIn){
      return true
    }else {
      this.router.navigate(['/not-found']);
      return false;
    }
    }
  }
