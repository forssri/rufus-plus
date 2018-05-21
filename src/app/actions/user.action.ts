import { Action } from '@ngrx/store';
import { User } from '../models';

export const GET_USER = '[Auth] Get User';
export const AUTHENTICATED = '[Auth] Authenticated';
export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';
export const GOOGLE_LOGIN = '[Auth] Google login';
export const LOGOUT = '[Auth] Logout';
export const AUTH_ERROR = '[Auth] Error';
export const GET_PROFILE = '[Profile] Get Profile';
export const UPDATE_PROFILE = '[Profile] Update Profile';
export const UPDATE_PROFILE_SUCCESS = '[Profile] Update Profile Success';
export const FIRST_LOGIN = '[Profile] First Login';

export class GetUser implements Action {
    readonly type = GET_USER;
    constructor(public payload?: any) { }
}
export class Authenticated implements Action {
    readonly type = AUTHENTICATED;
    constructor(public payload?: any) { }
}
export class NotAuthenticated implements Action {
    readonly type = NOT_AUTHENTICATED;
    constructor(public payload?: any) { }
}
export class GoogleLogin implements Action {
    readonly type = GOOGLE_LOGIN;
    constructor(public payload?: any) { }
}
export class Logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload?: any) { }
}
export class AuthError implements Action {
    readonly type = AUTH_ERROR;
    constructor(public payload?: any) { }
}

export class GetProfile implements Action {
    readonly type = GET_PROFILE;
    constructor(public payload?: any) { }
}

export class UpdateProfile implements Action {
    readonly type = UPDATE_PROFILE;
    constructor(public payload?: any) { }
}

export class UpdateProfileSuccess implements Action {
    readonly type = UPDATE_PROFILE_SUCCESS;
    constructor(public payload?: any) { }
}

export class FirstLogin implements Action {
    readonly type = FIRST_LOGIN;
    constructor(public payload?: any) { }
}

export type All
    = GetUser
    | Authenticated
    | NotAuthenticated
    | GoogleLogin
    | Logout
    | AuthError
    | GetProfile
    | UpdateProfile
    | UpdateProfileSuccess
    | FirstLogin;
