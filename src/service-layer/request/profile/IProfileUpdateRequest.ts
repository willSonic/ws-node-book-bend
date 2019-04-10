export interface IProfileUpdateRequest{
  id: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  admin?: boolean;
  interestCategories?:Array<string>;
}
