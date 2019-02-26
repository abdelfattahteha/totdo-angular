import { CanActivate } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthGaurd implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const isAuth = this.authService.checkAuth();
        if (isAuth) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
        }
    }
   
}