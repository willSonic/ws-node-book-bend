import mongoose = require('mongoose');
export interface ICommentDocument extends mongoose.Document {
  id: string,
  bookRef: string, //book Id
  userRef: string, //user Id
  text: string,
  createdAt: Date,
  modifiedAt: Date
}
