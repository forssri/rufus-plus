import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public userService: UserService
  ) {
    this.profileForm = this.fb.group({
      name: this.userService.firebaseUser.displayName,
      dob: '',
      weight: ''
    });
  }

  ngOnInit() {
  }

  saveProfile() {
    console.log(this.profileForm.value);
  }

}
