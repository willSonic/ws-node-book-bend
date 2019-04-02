import {ICommentDocument} from '../data-abstracts/repositories/comment';

export class CommentModel {

  private _commentModel: ICommentDocument;

  constructor(iCommentDocument: ICommentDocument) {
    this._commentModel = iCommentDocument;
  }

  get id(): string {
    return (this._commentModel.id).toString();
  }

  get bookRef(): string {
    return this._commentModel.bookRef;
  }


  get userRef(): string {
    return this._commentModel.userRef;
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
