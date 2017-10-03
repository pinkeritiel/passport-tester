import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions} from '@angular/http';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Member } from '../models/class.member';

@Injectable()
export class DataService {
  private headers = new Headers({'Content-Type': 'application/json'});


  result:any;

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
  }
  
  findUser(email:string) {
    console.log('in findUser for ' + email);
    var _emailToget = email;
    let options = new RequestOptions({ headers: this.headers });
    return this._http.get("/api/byemail",{ params : { email : _emailToget}})
    .map(result => result.json());
  }

  register(member:Member) {
    let options = new RequestOptions({ headers: this.headers });
    console.log('posting Member ' + JSON.stringify(member));
    return this._http.post("/api/register",JSON.stringify(member),options)
    .map(result => result.json() as Member)
   };

    private handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

/*
  doLogin(member:Member) {
    console.log('in doLogin for ' + member.username + ' ' + member.password);
    var _usernameToget = member.username;
    var _passwordToget = member.password;
    return this._http.get("/api/register",{ params : { name : _usernameToget, password : _passwordToget}})
    .map(result => result.json() as Member);
  }

register(member:Member): Promise<Member>{
    let options = new RequestOptions({ headers: this.headers });
    console.log('posting Member ' + JSON.stringify(member));
    return this._http.post("/api/register",JSON.stringify(member),options)
    .toPromise()
    .then(result => result.json() as Member)
    .catch(this.handleErrorPromise);
   };



  postMember(member:Member): Promise<Member>{
    let options = new RequestOptions({ headers: this.headers });
    console.log('posting Member ' + JSON.stringify(member));
  	return this._http.post("/api/members/add",JSON.stringify(member),options)
    .toPromise()
    .then(result => result.json() as Member)
    .catch(this.handleErrorPromise);
   };
 
  */  
}