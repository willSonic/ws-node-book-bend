import { IBookResponse, IUserResponse } from '..';

export interface ICommentResponse{
  id?: string;
  book?: IBookResponse; //book Id
  user?: IUserResponse; //user Id
  text?: string;
  createdAt?: Date;
  modifiedAt?: Date
}

export type ICommentResponses = ICommentResponse[];
