export interface IInventoryUpdateRequest{
  id:string;
  bookRef?: string;
  currentUserRef?: string;
  available?: boolean;
  checkOutDate?: string;
  returnDate?: string;
  waitList?: Array<any>;
}
