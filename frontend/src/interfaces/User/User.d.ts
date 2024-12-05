export interface IUser {
    _id:       string;
    email:     string;
    firstName: string;
    lastName:  string;
    active:    boolean;
    createdAt: Date;
    updatedAt: Date;
}