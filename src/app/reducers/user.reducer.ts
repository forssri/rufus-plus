import * as userActions from '../actions/user.action';
import { User } from '../models';

export type Action = userActions.All;

const defaultUser = new User(null, '');

export function userReducer(state: User = defaultUser, action: Action) {
    switch (action.type) {
        case userActions.GET_USER:
            return { ...state, loading: true };
        case userActions.AUTHENTICATED:
            return { ...state, ...action.payload, loading: true };
        case userActions.NOT_AUTHENTICATED:
            return { ...state, ...defaultUser, loading: false };
        case userActions.GOOGLE_LOGIN:
            return { ...state, loading: true };
        case userActions.AUTH_ERROR:
            return { ...state, ...action.payload, loading: false };
        case userActions.LOGOUT:
            return { ...state, loading: true };
        case userActions.GET_PROFILE:
            state.profile = action.payload;
            return { ...state, loading: false };
        case userActions.UPDATE_PROFILE:
            return { ...state, loading: true };
        case userActions.UPDATE_PROFILE_SUCCESS:
            return { ...state, loading: false };
        case userActions.FIRST_LOGIN:
            return { ...state, loading: false };
    }
}

