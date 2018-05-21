import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { firebase } from '@firebase/app';

import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

import { User } from '../models';
import * as userActions from '../actions/user.action';
export type Action = userActions.All | boolean;

import { Profile } from '../models';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
    }

    @Effect()
    getUser: Observable<Action> = this.actions.ofType(userActions.GET_USER)
        .map((action: userActions.GetUser) => action.payload)
        .switchMap(payload => this.afAuth.user)
        .map(authData => {
            if (authData) {
                const user = new User(authData.uid, authData.displayName);
                return new userActions.Authenticated(user);
            } else {
                return new userActions.NotAuthenticated();
            }
        })
        .catch(err => of(new userActions.AuthError()));

    @Effect()
    login: Observable<Action> = this.actions.ofType(userActions.GOOGLE_LOGIN)
        .map((action: userActions.GoogleLogin) => action.payload)
        .switchMap(payload => {
            return Observable.fromPromise(this.googleLogin());
        })
        .map(credential => {
            return new userActions.GetUser();
        })
        .catch(err => of(new userActions.AuthError({ error: err.message })));

    @Effect()
    logout: Observable<Action> = this.actions.ofType(userActions.LOGOUT)
        .map((action: userActions.Logout) => action.payload)
        .switchMap(payload => {
            return of(this.afAuth.auth.signOut());
        })
        .map(authData => {
            return new userActions.NotAuthenticated();
        })
        .catch(err => of(new userActions.AuthError({ error: err.message })));

    @Effect()
    authenticated: Observable<Action> = this.actions.ofType(userActions.AUTHENTICATED)
        .map((action: userActions.Authenticated) => action.payload)
        .switchMap(payload => {
            const ref = this.afs.doc<Profile>(`users/${payload.uid}`);
            return ref.valueChanges();
        })
        .map(profile => {
            if (profile) {
                return new userActions.GetProfile(profile);
            } else {
                return new userActions.FirstLogin(profile);
            }
        });
    @Effect()
    updateProfile: Observable<Action> = this.actions.ofType(userActions.UPDATE_PROFILE)
        .map((action: userActions.UpdateProfile) => action.payload)
        .switchMap(payload => {
            const ref = this.afs.doc<Profile>(`users/${payload.uid}`);
            return Observable.fromPromise(ref.set(payload.profile));
        })
        .map((d) => {
            console.log(d);
            return new userActions.UpdateProfileSuccess();
        });
    @Effect({ dispatch: false })
    firstLogin: Observable<Action> = this.actions.ofType(userActions.FIRST_LOGIN)
        .map((action: userActions.FirstLogin) => action.payload)
        .switchMap(payload => {
            if (!payload) {
                return Observable.fromPromise(this.router.navigate(['profile']));
            }
        });
    private googleLogin(): Promise<any> {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }
}
