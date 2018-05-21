import { Profile } from '.';

export interface IUser {
    uid: string;
    displayName: string;
    profile?: Profile;
    loading?: boolean;
    error?: string;
}

export class User implements IUser {
    constructor(
        public uid: string,
        public displayName: string,
        public profile?: Profile
    ) { }
}
