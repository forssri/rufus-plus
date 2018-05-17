import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(public afAuth: AngularFireAuth, private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.afAuth.user.subscribe((user) => {
      console.log(user);
      this.userService.loadUserProfile(user);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
