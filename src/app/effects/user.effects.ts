import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AngularFireAuth } from 'angularfire2/auth';
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
export type Action = userActions.All;

@Injectable()
export class UserEffects {
    constructor(private actions: Actions, private afAuth: AngularFireAuth) {
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

    private googleLogin(): Promise<any> {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }
}
