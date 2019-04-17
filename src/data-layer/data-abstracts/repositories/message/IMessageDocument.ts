import {  Document }   from 'mongoose';
import { IUserDocument } from '../user';

export interface IMessageDocument extends Document {
  id: string,
  user:IUserDocument,
  messageType:string,
  messageText:string,
  reviewedAt:Date,
  createdAt: Date,
  modifiedAt: Date
}
