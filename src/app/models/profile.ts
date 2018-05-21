export interface IProfile {
    dob: string;
    sex: string;
    weight: number;
    bloodGroup: string;
}

export class Profile implements IProfile {
    constructor(
        public dob: string,
        public sex: string,
        public weight: number,
        public bloodGroup: string
    ) { }
}
