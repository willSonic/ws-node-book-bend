export interface IProfileWithUserResponse{
  id:string,
  userRef:string,
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  checkedOutCount: number,
  waitListCount: number,
  commentRefs:string[],
  messageRefs: string[],
  bookedRefs: string[],
  waitlistRefs: string[],
  interestCategories: string[],
  createdAt:Date,
  modifiedAt: Date
}
