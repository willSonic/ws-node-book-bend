import { IProfileDocument } from '../data-abstracts/repositories/profile';
import { ICommentResponse, IInventoryResponse, IMessageResponse, IUserResponse } from '../../service-layer/responses';
import { IBookedResponse } from '../../service-layer/responses/booked/IBookedResponse';


export class ProfileModel {

  private _profileModel: IProfileDocument;

  constructor( iProfileDocument:IProfileDocument ){
    this._profileModel = iProfileDocument
  }

  get id(): string {
    return (this._profileModel.id).toString();
  }

  get user(): IUserResponse {
     return this._profileModel.user;
  }

  get checkedOutCount(): number {
     return this._profileModel.checkedOutCount;
  }
  get waitListCount(): number {
     return this._profileModel.waitListCount;
  }

  get comments(): ICommentResponse[] {
     return this._profileModel.comments;
  }

  get messages(): IMessageResponse[]{
     return this._profileModel.messages;
  }

  get inventories(): IInventoryResponse[]{
     return this._profileModel.inventories;
  }

  get booksOut(): IBookedResponse[] {
     return this._profileModel.booksOut;
  }

  get interestCategories(): Array<string> {
     return this._profileModel.interestCategories;
  }

  get createdAt(): Date {
    return this._profileModel.createdAt;
  }

  get modifiedAt(): Date {
    return this._profileModel.modifiedAt;
  }

}
