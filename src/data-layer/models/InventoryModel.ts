import {IInventoryDocument} from '../data-abstracts/repositories/inventory';


export class InventoryModel {

  private _inventoryModel: IInventoryDocument;

  constructor(iInventoryDocument: IInventoryDocument) {
    this._inventoryModel = iInventoryDocument;
  }


  get id(): string {
    return (this._inventoryModel.id).toString();
  }

  get bookRef(): string {
    return this._inventoryModel.bookRef;
  }

  get crntBookedRef(): string {
    return this._inventoryModel.crntBookedRef;
  }

  get available(): boolean{
    return this._inventoryModel.available;
  }

  get waitList(): Array<{ userRef:string,  requestDate: Date}> {
    return this._inventoryModel.waitList;
  }
  get createdAt(): Date {
    return this._inventoryModel.createdAt;
  }

  get modifiedAt(): Date {
    return this._inventoryModel.modifiedAt;
  }

}
