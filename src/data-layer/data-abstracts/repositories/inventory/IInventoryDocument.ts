import {  Document }   from 'mongoose';

export interface IInventoryDocument extends Document {
  id: string,
  bookRef:string,
  crntBookedRef:string,
  available: boolean,
  waitList: [{
        userRef:string,
        requestDate: Date,
    }]
  createdAt: Date,
  modifiedAt: Date
}
