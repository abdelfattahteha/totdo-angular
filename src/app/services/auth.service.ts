import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private url: string = environment.apiUrl + "/api";
    userSub = new Subject();
    private isLogged: boolean = false;

    constructor(private http: HttpClient, private router: Router) {}


    login(loginData: any) {
        return this.http.post<{token: string, user:any}>(this.url+"/auth/login",loginData)
        .pipe(
            map( response => {
                this.setToken(response.token);
                this.isLogged = true;
            })
        );
    }

    signup(signupData: any) {
        return this.http
            .post<{message:string ,token:string,user:any}>( this.url+"/auth/signup" , signupData)
            .pipe(
                map( response => {
                    this.setToken(response.token);
                    this.isLogged = true;
                    return response.user;
                })
            ).subscribe(user => {
                this.router.navigate(['/home']);
            });
    }

    getUser() {
        return this.userSub.asObservable();
    }

    checkEmail(email:string) {
        return this.http.get<{emailExist:boolean}>(this.url+ `/auth/checkemail/${email}`);
    }


    logout() {
        localStorage.removeItem('token');
        this.isLogged = false;
        this.router.navigate(['/auth/login']);
    }

    // return true if loggedIn or false to AuthGaurd
    checkAuth() {
        let token = this.getToken();
        if (!token) {
            return null;
        }

        this.isLogged = true;
        let userId = jwt_decode(token).userId;
        this.initUser(userId);
        return true;

    }

    initUser(userId: string) {
        this.http.get<{user:any}>(this.url+`/auth/user/${userId}`)
            .subscribe( response => {
                this.userSub.next(response.user);
            });
    }


    isLoggedIn() {
        return this.isLogged;
    }


    private setToken(token: string) {
        localStorage.setItem('token', token);
    }


    getToken(): string {
        const token = localStorage.getItem('token');
        if (token) {
            return token;
        } else {
            return null;
        }
    }


}