import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { User } from '../_models/index';
import { Book } from '../_models/index';
import { Tag } from '../_models/index';
import { Group } from '../_models/index';
import { Account } from '../_models/account';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(appConfig.apiUrl + '/users');
    }

    
    getAllgroups() {
        return this.http.get<Group[]>(appConfig.apiUrl + '/users/groups');
    }




    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/users/' + _id);
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + '/users/register', user);
    }
    addBook(book:Book){

    return this.http.post(appConfig.apiUrl + '/users/registerone', book);  
        //addBook(bookData){
            
                //return this.http.post(appConfig.apiUrl + '/users/registerone', user); 
               //return this.http.post('http://34.192.184.245:3000/notes',bookData);

    }
    addTag(tag:Tag){
        return this.http.post(appConfig.apiUrl + '/users/tag', tag);  
    }
    addGroup(group:Group){
        return this.http.post(appConfig.apiUrl + '/users/group', group);  
    }
    addAccount(acc:Account){
        return this.http.post(appConfig.apiUrl + '/users/account', acc);  
    }

    update(user: User) {
        return this.http.put(appConfig.apiUrl + '/users/' + user._id, user);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/users/' + _id);
    }
}