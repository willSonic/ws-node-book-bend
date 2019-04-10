export interface IProfileResponse{
  id:string;
  userRef: string;
  checkedOutCount: number;
  waitListCount: number;
  messageRefs: string[];
  commentRefs: string[];
  interestCategories: string[];
  createdAt:Date;
}
