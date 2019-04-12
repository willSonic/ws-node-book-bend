export interface  IProfileCreateRequest{
  userRef:string,
  checkedOutCount?: number,
  waitListCount?: number ,
  commentRefs?:string[],
  messageRefs?: string[],
  bookedRefs?: string[],
  waitlistRefs?: string[],
  interestCategories?: string[],
}
