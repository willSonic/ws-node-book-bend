import {  Document }   from 'mongoose';
import { IBookedDocument } from '../booked';

export interface IInventoryDocument extends Document {
  id: string,
  bookIdRef:string,
  booked:IBookedDocument,
  available: boolean,
  waitList: [{
        userRef:string,
        requestDate: Date,
    }]
  createdAt: Date,
  modifiedAt: Date
}
