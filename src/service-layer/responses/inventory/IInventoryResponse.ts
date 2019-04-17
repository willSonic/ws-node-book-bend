import { IBookedResponse } from '../booked/IBookedResponse';

export interface IInventoryResponse {
  id?: string;
  bookIdRef?: string
  booked?:IBookedResponse;
  available?: boolean;
  waitList?: Array<{  userRef:string,  requestDate: Date }>
  createdAt?: Date;
  modifiedAt?: Date
}
