export interface ICommentResponse{
  id?: string,
  bookRef?: string, //book Id
  userRef?: string, //user Id
  text?: string,
  createdAt?: Date,
  modifiedAt?: Date
}
