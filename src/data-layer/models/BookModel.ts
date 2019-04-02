import {IBookDocument} from '../data-abstracts/repositories/book';


export class BookModel {

  private _bookModel: IBookDocument;

  constructor(iBookDocument: IBookDocument) {
    this._bookModel = iBookDocument;
  }


  get id(): string {
    return (this._bookModel.id).toString();
  }

  get googleId(): string {
    return this._bookModel.googleId;
  }


  get authors(): Array<string> {
    return this._bookModel.authors;
  }

  get averageRating(): number {
    return this._bookModel.averageRating;
  }


  get description(): string {
    return this._bookModel.description;
  }

  get imageLinks(): object {
    return this._bookModel.imageLinks;
  }

  get pageCount(): number {
    return this._bookModel.pageCount;
  }

  get subtitle(): string {
    return this._bookModel.subtitle;
  }

  get title(): string {
    return this._bookModel.description;
  }

  get categories(): Array<string> {
    return this._bookModel.categories;
  }


  get ratingsCount(): number {
    return this._bookModel.ratingsCount;
  }


  get publishedDate(): Date {
    return this._bookModel.publishedDate;
  }


  get publisher(): string {
    return this._bookModel.publisher;
  }





  get createdAt(): Date {
    return this._bookModel.createdAt;
  }

  get modifiedAt(): Date {
    return this._bookModel.modifiedAt;
  }

}
