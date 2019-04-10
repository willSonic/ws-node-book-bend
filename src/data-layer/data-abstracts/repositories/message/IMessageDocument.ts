import {  Document }   from 'mongoose';

export interface IMessageDocument extends Document {
  id: string,
  userRef:string,
  messageType:string,
  messageText:string,
  reviewedAt:Date,
  createdAt: Date,
  modifiedAt: Date
}
