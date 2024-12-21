import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private route: Router) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const token = this.loginService.getToken();


    if (token === null) {
      this.route.navigate(['login'])
      return false;
    }

    return true;

  }


}
