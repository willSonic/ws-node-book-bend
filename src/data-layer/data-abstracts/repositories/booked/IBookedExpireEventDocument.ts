import {  Document, Types }   from 'mongoose';
import { IBookedDocument } from './IBookedDocument';

export interface IBookedExpireEventDocument extends Document{
  id: string,
  booked:IBookedDocument,
  createdAt: Date,
}
