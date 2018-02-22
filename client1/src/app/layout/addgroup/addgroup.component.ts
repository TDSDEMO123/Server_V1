import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../../_services/index';
import { User } from '../../_models/index';


@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent  {

    currentUser: User;
    users: User[] = [];

    

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

  model: any = {};
  loading = false;

  arrBirds: any [] = [
    { id:1, name: 'Bells Sparrow' },
    { id:2, name: 'Mourning Dove'},
    { id:3, name: 'Bald Eagle' }
  ];

  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) {
        
       }

      group() {
     //alert(this.model.members);
      //console.log(this.model.members);
      this.loading = true;
      this.userService.addGroup(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Group Created successfully', true);
                  this.router.navigate(['/dashboard']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}

