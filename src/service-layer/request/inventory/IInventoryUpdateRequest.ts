export interface IInventoryUpdateRequest{
  id:string;
  bookRef?: string;
  crntBookedRef?: string;
  available?: boolean;
  waitList?: Array<any>;
}
