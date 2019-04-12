import { Document } from 'mongoose';
import { IBookedExpireEventDocument } from '../data-abstracts/repositories/booked';

export class BookedExpireEventModel {

  private _bookedExpireEventModel: IBookedExpireEventDocument;

  constructor(iBookedExpireEventDocument: IBookedExpireEventDocument) {
    this._bookedExpireEventModel = iBookedExpireEventDocument;
  }

  get id(): string {
    return (this._bookedExpireEventModel.id).toString();
  }

  get bookedRef(): string {
    return this._bookedExpireEventModel.bookedRef;
  }

  get createdAt(): Date {
    return this._bookedExpireEventModel.createdAt;
  }

}
