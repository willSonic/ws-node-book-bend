import { Document } from 'mongoose';
import { IBookedExpireEventDocument } from '../data-abstracts/repositories/booked';
import { IBookedResponse } from '../../service-layer/responses/booked/IBookedResponse';

export class BookedExpireEventModel {

  private _bookedExpireEventModel: IBookedExpireEventDocument;

  constructor(iBookedExpireEventDocument: IBookedExpireEventDocument) {
    this._bookedExpireEventModel = iBookedExpireEventDocument;
  }

  get id(): string {
    return (this._bookedExpireEventModel.id).toString();
  }

  get booked(): IBookedResponse {
    return this._bookedExpireEventModel.booked;
  }

  get createdAt(): Date {
    return this._bookedExpireEventModel.createdAt;
  }

}
