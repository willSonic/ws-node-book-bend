import {  Document, Types }   from 'mongoose';
import { IUserDocument } from '../user';
import { IBookDocument } from '../book';

export interface IBookedDocument extends Document{
  id: string,
  book: IBookDocument,
  user: IUserDocument,
  returnDate: Date,
  active: boolean,
  createdAt: Date,
  modifiedAt: Date
}
