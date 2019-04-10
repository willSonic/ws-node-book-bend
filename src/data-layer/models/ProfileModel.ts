import { IProfileDocument } from '../data-abstracts/repositories/profile';


export class ProfileModel {

  private _profileModel: IProfileDocument;

  constructor( iProfileDocument:IProfileDocument ){
    this._profileModel = iProfileDocument
  }

  get id(): string {
    return (this._profileModel.id).toString();
  }

  get userRef(): string {
     return this._profileModel.userRef;
  }

  get checkedOutCount(): number {
     return this._profileModel.checkedOutCount;
  }
  get waitListCount(): number {
     return this._profileModel.waitListCount;
  }

  get commentRefs(): Array<string> {
     return this._profileModel.commentRefs;
  }
  get messageRefs(): Array<string> {
     return this._profileModel.messageRefs;
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
