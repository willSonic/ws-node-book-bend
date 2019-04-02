export interface IUserUpdateRequest{
  id?:string,
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  admin?: boolean;
}
