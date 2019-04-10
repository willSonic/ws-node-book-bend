export interface IInventoryCreateRequest{
  bookRef: string;
  currentUserRef: string;
  available: boolean;
  checkOutDate: string;
  returnDate: string;
  waitList:Array<any>;
}
