import { IMessageDocument } from '../data-abstracts/repositories/message';
import { IUserResponse } from '../../service-layer/responses';


export class MessageModel {
  private _messageModel: IMessageDocument;

  constructor( iMessageDocument:IMessageDocument){
    this._messageModel = iMessageDocument;
  }

  get id(): string {
     return this._messageModel.id;
  }

  get user(): IUserResponse {
     return this._messageModel.user;
  }

  get messageType(): string {
     return this._messageModel.messageType;
  }

  get messageText(): string {
     return this._messageModel.messageText;
  }

  get reviewedAt(): Date {
    return this._messageModel.reviewedAt;
  }


  get createdAt(): Date {
    return this._messageModel.createdAt;
  }

  get modifiedAt(): Date {
    return this._messageModel.modifiedAt;
  }

}
