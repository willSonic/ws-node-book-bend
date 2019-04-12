export interface IProfileResponse{
  id:string,
  userRef: string,
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
