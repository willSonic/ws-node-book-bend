import { IUserResponse } from '../../responses';
import { IUserDocument } from '../../../data-layer/data-abstracts/repositories/user';

export interface  IProfileCreateRequest{
  user:string,
  checkedOutCount?: number,
  waitListCount?: number ,
  commentRefs?:string[],
  messageRefs?: string[],
  booksOut?: string[],
  waitList?: string[],
  interestCategories?: string[],
}
