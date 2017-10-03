import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { UserService } from '../user.service';
//import { DataService } from '../data.service';
import { AlertService, AuthenticationService } from '../services/index';

@Component({
  selector: 'app-login-form',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginFormComponent implements OnInit {
  results: Array<any>;
  isVerifiedLogin = false;
  model: any = {};
  loading = false;
  returnUrl: string;
  
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

  ngOnInit() {
    console.log('hit');
  }

  login() {
  	//e.preventDefault();
  	//console.log(e);
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
//                .subscribe(result => {
//                if (result === true) {
//                    this.router.navigate(['/']);
//                } else {
//                    this.error = 'Username or password is incorrect';
 //                   this.loading = false;
 //               }
 //           });

        .subscribe(
          data => {
            console.log("successful authentication");
            this.router.navigate(['/dashboard']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    // Access the Data Service's getUsers() method we defined
    //this._dataService.getUsers()
    //    .subscribe(res => this.results = res);
    
  	//var username = e.target.elements[0].value;
  	//var password = e.target.elements[1].value;
  	//console.log(username + ' ' + password);
    /*
    this._dataService.doLogin(username,password)
      .subscribe(res => {
          console.log("success");
          if (res==null){
            console.log("member does not exist");
            this.isVerifiedLogin =false;
          } 
          else {
            this.isVerifiedLogin =true;
            this.user.setUserLoggedIn();
            console.log('successfully logged in');
            this.router.navigate(['/dashboard']);
            }
          },
            err => {
            console.log("error in find user" + err);
          });
          */
  }

 gotoNewMember(): void {
    this.router.navigate(['/newmember']);
  }

}
