import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService, DataService } from '../services/index';
//import { Member } from '../models/class.member';
var Member = require('../models/class.member');
@Component({

    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model= new Member('','', '', false, '', '','');
    loading = false;

    constructor(
        private router: Router,
        private dataService: DataService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.dataService.register(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}