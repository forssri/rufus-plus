import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { User } from '../models';
import * as userActions from '../actions/user.action';
import { AppState } from '../app.init';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.user$ = this.store.select('user');
    this.store.dispatch(new userActions.GetUser());
  }

  login() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  logout() {
    this.store.dispatch(new userActions.Logout());
  }

}
