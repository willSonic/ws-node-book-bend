import { IProfileResponse } from './IProfileResponse';

export interface IProfileAddBookResponse{
  isWaitListOption:boolean,
  bookId?:string,
  listPosition?:number,
  waitTime?:number,
  profile?:IProfileResponse
}
