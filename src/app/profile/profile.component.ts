import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { Profile, User } from '../models';
import { AppState } from '../app.init';
import * as userActions from '../actions/user.action';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  user$: Observable<User>;
  user: User;
  datePipe: DatePipe;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private store: Store<AppState>
  ) {
    this.profileForm = this.fb.group({
      dob: [null, Validators.required],
      sex: ['', Validators.required],
      weight: ['', Validators.required],
      bloodGroup: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.user$ = this.store.select('user');
    this.subscription = this.user$.subscribe(user => {
      console.log(1);
      this.updateForm(user);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  updateForm(user: User): void {
    if (user) {
      console.log(user);
      this.user = user;
      if (user.profile) {
        this.profileForm.patchValue(user.profile);
      }
    }
  }
  saveProfile() {
    this.user.profile = this.profileForm.value;
    this.user.profile.dob = new Date(this.user.profile.dob).toISOString();
    this.store.dispatch(new userActions.UpdateProfile(this.user));
  }

}
