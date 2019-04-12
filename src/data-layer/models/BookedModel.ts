import { IBookedDocument } from '../data-abstracts/repositories/booked';


export class BookedModel {

  private _bookedModel: IBookedDocument;

  constructor(iBookedDocument: IBookedDocument) {
    this._bookedModel = iBookedDocument;
  }

  get id(): string {
    return (this._bookedModel.id).toString();
  }

  get bookRef(): string {
    return this._bookedModel.bookRef;
  }


  get userRef(): string {
    return this._bookedModel.userRef;
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
