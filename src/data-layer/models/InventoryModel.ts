import {IInventoryDocument} from '../data-abstracts/repositories/inventory';
import { IBookedResponse } from '../../service-layer/responses/booked/IBookedResponse';


export class InventoryModel {

  private _inventoryModel: IInventoryDocument;

  constructor(iInventoryDocument: IInventoryDocument) {
    this._inventoryModel = iInventoryDocument;
  }


  get id(): string {
    return (this._inventoryModel.id).toString();
  }

  get bookGoogleId(): string {
    return this._inventoryModel.bookGoogleId;
  }

  get booked(): IBookedResponse {
    return this._inventoryModel.booked;
  }

  get available(): boolean{
    return this._inventoryModel.available;
  }

  get waitList(): Array<{ userId:string,  requestDate: Date}> {
    return this._inventoryModel.waitList;
  }
  get createdAt(): Date {
    return this._inventoryModel.createdAt;
  }

  get modifiedAt(): Date {
    return this._inventoryModel.modifiedAt;
  }

}
