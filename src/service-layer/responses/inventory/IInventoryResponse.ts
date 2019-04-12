export interface IInventoryResponse {
  id?: string;
  bookRef?: string
  crntBookedRef?:string;
  available?: boolean;
  waitList?: Array<{  userRef:string,  requestDate: Date }>
  createdAt?: Date;
  modifiedAt?: Date
}
