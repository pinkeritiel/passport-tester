import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { 
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    
    public token: string;

    login(username: string, password: string) {
        console.log("login for: " + username + "  " + password );
        //return this.http.post("/login",JSON.stringify({ username: username, password: password }));
        
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post("/login", JSON.stringify({ username: username, password: password }), {headers: headers})
                 .map((response: Response) => {
                // login successful if there's a jwt token in the response
               // let token = response.json() && response.json().token;
               // if (token) {
                    // set token property
                   // this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username }));

                    // return true to indicate successful login
                    return true;
                //} else {
                    // return false to indicate failed login
                //    return false;
               // }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}