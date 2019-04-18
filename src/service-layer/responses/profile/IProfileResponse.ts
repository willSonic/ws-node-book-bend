import { IBookedResponse } from '../booked/IBookedResponse';
import { ICommentResponse, IMessageResponse, IUserResponse } from '..';

export interface IProfileResponse{
  id:string,
  user: IUserResponse,
  checkedOutCount: number,
  waitListCount: number,
  comments?:Array<ICommentResponse>,
  messages?: Array<IMessageResponse>,
  booksOut?: Array<IBookedResponse>,
  waitList?: Array<{  userId:string,  requestDate: Date }>,
  interestCategories?: string[],
  createdAt:Date,
  modifiedAt: Date
}
