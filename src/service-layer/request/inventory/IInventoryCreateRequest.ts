export interface IInventoryCreateRequest{
  userRef: string,
  bookRef: string;
  crntBookedRef: string;
  available: boolean;
  waitList:Array<any>;
}
