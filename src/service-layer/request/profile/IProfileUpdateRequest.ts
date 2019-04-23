import { IBookedResponse } from '../../responses/booked/IBookedResponse';
import { ICommentResponse, IMessageResponse, IUserResponse } from '../../responses';

export interface IProfileUpdateRequest{
  id: string;
  user?:IUserResponse,
  checkedOutCount?: number,
  waitListCount?: number ,
  commentRefs?:string[],
  messageRefs?: string[],
  booksOut?: string[],
  waitList?: string[],
  interestCategories?:Array<string>,
}
