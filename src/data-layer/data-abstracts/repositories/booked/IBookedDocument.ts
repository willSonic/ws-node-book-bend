import {  Document }   from 'mongoose';

export interface IBookedDocument extends Document{
  id: string,
  bookRef: string
  userRef:string,
  returnDate: Date,
  active: boolean,
  createdAt: Date,
  modifiedAt: Date
}
