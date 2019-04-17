import {ICommentDocument} from '../data-abstracts/repositories/comment';
import { IBookResponse, IUserResponse } from '../../service-layer/responses';

export class CommentModel {

  private _commentModel: ICommentDocument;

  constructor(iCommentDocument: ICommentDocument) {
    this._commentModel = iCommentDocument;
  }

  get id(): string {
    return (this._commentModel.id).toString();
  }

  get book(): IBookResponse {
    return this._commentModel.book;
  }


  get user(): IUserResponse {
    return this._commentModel.user;
  }

  get text(): string{
    return this._commentModel.text;
  }

  get createdAt(): Date {
    return this._commentModel.createdAt;
  }

  get modifiedAt(): Date {
    return this._commentModel.modifiedAt;
  }

}
