import { Component, OnInit, group } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../../_services/index';
import { User } from '../../_models/index';
import { Group } from '../../_models/index';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.component.html',
  styleUrls: ['./addaccount.component.css']
})
export class AddaccountComponent  {
  
    model: any = {};
    loading = false;
  


  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) {
        
       }

      account() {
     //alert(this.model.accountname);
      //console.log(this.model.members);
      this.loading = true;
      this.userService.addAccount(this.model)
          .subscribe(
              data => {
                  console.log(data);
                  this.alertService.success('Account Created successfully', true);
                  this.router.navigate(['/dashboard']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }


 
    
    groupp: Group[] = [];
    //users: User[] = [];
    

    ngOnInit() {
        this.userService.getAllgroups().subscribe(groupp => { this.groupp = groupp; });
    }

   

}

