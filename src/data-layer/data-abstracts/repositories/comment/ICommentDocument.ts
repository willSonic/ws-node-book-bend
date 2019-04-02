import {  Document }   from 'mongoose';

export interface ICommentDocument extends Document {
  id: string,
  bookRef: string, //book Id
  userRef: string, //user Id
  text: string,
  createdAt: Date,
  modifiedAt: Date
}
