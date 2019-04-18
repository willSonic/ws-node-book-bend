import { IBookResponse } from '../../responses';

export interface IProfileAddBookRequest{
  userId:string,
  book:IBookResponse,
}
