import { IBookedDocument } from '../data-abstracts/repositories/booked';
import { IBookResponse, IUserResponse } from '../../service-layer/responses';


export class BookedModel {

  private _bookedModel: IBookedDocument;

  constructor(iBookedDocument: IBookedDocument) {
    this._bookedModel = iBookedDocument;
  }

  get id(): string {
    return (this._bookedModel.id).toString();
  }

  get book(): IBookResponse {
    return this._bookedModel.book;
  }


  get user(): IUserResponse {
    return this._bookedModel.user;
  }

  get returnDate(): Date {
    return this._bookedModel.returnDate;
  }

  get active(): boolean {
    return this._bookedModel.active;
  }
  get createdAt(): Date {
    return this._bookedModel.createdAt;
  }

  get modifiedAt(): Date {
    return this._bookedModel.modifiedAt;
  }

}
