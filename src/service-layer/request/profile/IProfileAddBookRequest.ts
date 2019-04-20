import { IBookCreateRequest} from '..';

export interface IProfileAddBookRequest{
  userId:string,
  book:IBookCreateRequest,

}
