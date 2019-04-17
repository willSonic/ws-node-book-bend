import { IBookResponse, IUserResponse } from '..';

export interface IBookedResponse{
  id?: string;
  user:IUserResponse;
  book:IBookResponse;
  returnDate?: Date;
  active:boolean,
  createdAt?: Date;
  modifiedAt?: Date
}
