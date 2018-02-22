import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';




import { AlertService, UserService } from '../../_services/index';
@Component({
  selector: 'app-addtag',
  templateUrl: './addtag.component.html',
  styleUrls: ['./addtag.component.css']
})
export class AddtagComponent  {

  model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    tag() {
       
        //console.log(this.model.subject);
        this.loading = true;
        this.userService.addTag(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Tag Created successfully', true);
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
