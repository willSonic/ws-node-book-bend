import {  Document }   from 'mongoose';

export interface IInventoryDocument extends Document {
  id: string,
  bookRef: string
  currentUserRef:string,
  availStatus: boolean,
  checkOutDate: Date,
  returnDate: Date,
  waitList: [{
        userRef:string,
        requestDate: Date,
    }]
  createdAt: Date,
  modifiedAt: Date
}
