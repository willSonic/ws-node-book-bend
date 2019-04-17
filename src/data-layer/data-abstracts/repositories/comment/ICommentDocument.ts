import mongoose = require('mongoose');
import { IBookDocument } from '../book';
import { IUserDocument } from '../user';
export interface ICommentDocument extends mongoose.Document {
  id: string,
  book: IBookDocument, //book Id
  user: IUserDocument, //user Id
  text: string,
  createdAt: Date,
  modifiedAt: Date
}
