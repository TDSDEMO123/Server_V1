import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';




import { AlertService, UserService } from '../../_services/index';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {

    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ticket() {
       
        //console.log(this.model.description);
        this.loading = true;
        this.userService.addBook(this.model)
       /*let bookData = {
        name: this.model.subject,
        password: this.model.description,
        
      }*/

      //vgrthis.userService.addBook(bookData)
            .subscribe(
                data => {
                    this.alertService.success('Ticket Created successfully', true);
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
