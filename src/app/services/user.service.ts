import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User as FirebaseUser } from '@firebase/auth-types';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  firebaseUser: FirebaseUser;
  newUser = false;
  constructor(private afs: AngularFirestore, private router: Router) { }

  loadUserProfile(firebaseUser: FirebaseUser): void {
    this.firebaseUser = firebaseUser;
    this.userDoc = this.afs.doc<User>(`users/${firebaseUser.uid}`);
    this.user = this.userDoc.valueChanges();
    this.user.subscribe((d) => {
      if (!d) {
        this.newUser = true;
        this.router.navigate(['profile']);
      }
    });
  }

  updateUserProfile(user: User): void {
    console.log(user);
  }
}
