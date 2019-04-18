import { IBookedResponse } from '../booked/IBookedResponse';

export interface IInventoryResponse {
  id?: string;
  bookGoogleId?: string
  booked?:IBookedResponse;
  available?: boolean;
  waitList?: Array<{  userId:string,  requestDate: Date }>
  createdAt?: Date;
  modifiedAt?: Date
}
