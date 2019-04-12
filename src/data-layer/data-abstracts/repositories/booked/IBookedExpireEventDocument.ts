import {  Document }   from 'mongoose';

export interface IBookedExpireEventDocument extends Document{
  id: string,
  bookedRef:string,
  createdAt: Date,
}
