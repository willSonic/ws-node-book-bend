export interface IInventoryUpdateRequest{
  id:string;
  bookGoogleId: string;
  booked?: string;
  available?: boolean;
  waitList?: Array<any>;
}
