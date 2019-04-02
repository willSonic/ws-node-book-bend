export interface IInventoryResponse {
  id?: string,
  bookRef?: string
  currentUserRef?:string,
  available?: boolean,
  checkOutDate?: Date,
  returnDate?: Date,
  waitList?: Array<{  userRef:string,  requestDate: Date }>
  createdAt?: Date,
  modifiedAt?: Date
}
