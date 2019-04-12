export interface IProfileUpdateRequest{
  id: string;
  userRef:string,
  checkedOutCount?: number,
  waitListCount?: number,
  commentRefs?:Array<string>
  messageRefs?:Array<string>
  bookedRefs?:Array<string>
  waitlistRefs?:Array<string>
  interestCategories?:Array<string>;
}
