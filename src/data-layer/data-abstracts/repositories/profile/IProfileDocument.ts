import {  Document, Types }   from 'mongoose';
import { IBookedDocument } from '../booked';
import { IInventoryDocument } from '../inventory';
import { IMessageDocument } from '../message';
import { ICommentDocument } from '../comment';
import { IUserDocument } from '../user';

export interface IProfileDocument extends Document {
  id: string,
  user: IUserDocument,
  checkedOutCount: number,
  waitListCount: number,
  comments: Types.DocumentArray<ICommentDocument>,
  messages: Types.DocumentArray<IMessageDocument>,
  booksOut:Types.DocumentArray<IBookedDocument>,
  inventories: Types.DocumentArray<IInventoryDocument>,
  interestCategories: string[],
  createdAt: Date,
  modifiedAt: Date
}
