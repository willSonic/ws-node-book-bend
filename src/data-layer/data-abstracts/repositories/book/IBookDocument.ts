import {  Document }   from 'mongoose';

export interface IBookDocument extends Document {
  id: string,
  googleId:string,
  authors: string[],
  averageRating: number,
  description: string ,
  imageLinks:  {},
  pageCount: number,
  subtitle: string,
  title: string,
  categories: string[],
  ratingsCount: number,
  publishedDate: Date,
  publisher: string,
  createdAt: Date,
  modifiedAt: Date
}
