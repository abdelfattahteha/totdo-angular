import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TodoListService {
    url: string = environment.apiUrl+ '/api/list'
    constructor(private authService: AuthService, private http: HttpClient) {}

    addToList(title: string) {

        this.http.post<{user:any}>(this.url,{title:title})
        .subscribe( response => {
            this.authService.userSub.next(response.user);
        })

    }

    removeFromList(listId: string) {

        this.http.delete<{user:any}>(this.url+`/${listId}`)
        .subscribe( response => {
            this.authService.userSub.next(response.user);
        })

    }

    editItem(itemId: string, itemTitle:string) {
        this.http.put<{user:any}>(this.url+`/${itemId}`, {title: itemTitle})
            .subscribe (response => {
                this.authService.userSub.next(response.user);
            })
    }
}