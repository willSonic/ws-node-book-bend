import {  Document }   from 'mongoose';

export interface IProfileDocument extends Document {
  id: string,
  userRef:string,
  checkedOutCount: number,
  waitListCount: number ,
  commentRefs:string[],
  messageRefs: string[],
  interestCategories: string[],
  createdAt: Date,
  modifiedAt: Date
}
