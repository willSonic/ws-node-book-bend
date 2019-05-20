import { CommentRepo, ICommentDocument} from '../data-abstracts/repositories/comment';
import { logger } from '../../middleware/common/logging';
import { Conflict_409, NotFound_404, Unprocessable_422 } from '../../business-layer/utils/errors/ApplicationError';

export class CommentDataAgent {
  async createNewComment(comment:any):Promise<any> {
      let newComment = <ICommentDocument>(comment);
      let newCommentResult =  await CommentRepo.create(newComment);
      if(newCommentResult.errors){
          throw new Unprocessable_422("The DataBase currently unable to process Comment create request");
      }
      return newCommentResult;
  }

  async updateComment(comment:any):Promise<any> {
      let resultCommentById = await CommentRepo.findById(comment.id);
      if(!resultCommentById){
         throw  new  Conflict_409( `A Comment with id ${comment.id} entity does not exist!`);
      }

      Object.keys( resultCommentById).forEach(item =>{
              if(comment[item] && comment[item] !== undefined){
                  resultCommentById[item] = comment[item];
              }
      });
      let savedResult = await resultCommentById.save();
      if(savedResult.errors){
          throw new Unprocessable_422("The DataBase currently unable to process Comment update request");
      }
      return savedResult;
  }

  async getAllCommentsByUserId(userId:any):Promise<any> {
      let commentsByUserRefResult = await CommentRepo.find({ userRef:userId});
      if(!commentsByUserRefResult){
          throw new NotFound_404(`A Comments for a User  with an id of ${userId} does not currently exist`);
      }
      return commentsByUserRefResult;
  }

  async getAllCommentsByBookId(bookId:string):Promise<any> {
      let commentsByBookRefResult = await CommentRepo.find({ bookRef:bookId});
      if(!commentsByBookRefResult){
          throw new NotFound_404(`A Comments for a Book  with an id of ${bookId} does not currently exist`);
      }
      return commentsByBookRefResult;
  }


  async deleteComment(commentId:string):Promise<any> {
      let deleteCommentResult = await CommentRepo.findByIdAndRemove(commentId);
      if(deleteCommentResult.errors){
          throw new Unprocessable_422(`The DataBase is unable to process Comment with id ${commentId} delete request`);
      }
      return deleteCommentResult;
  }

}


