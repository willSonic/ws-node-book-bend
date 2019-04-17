import mongoose = require('mongoose');
import { CommentRepo, ICommentDocument} from '../data-abstracts/repositories/comment';
import { logger } from '../../middleware/common/logging';

export class CommentDataAgent {
  async createNewComment(comment:any):Promise<any> {
      let newComment = <ICommentDocument>(comment);
      let newCommentResult =  await CommentRepo.create(newComment);
      if(newCommentResult.errors){
          return  {thrown:true, success:false,  status:422,  message: "db is currently unable to process request"};
      }
      return newCommentResult;
  }

  async updateComment(comment:any):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(comment.id)){
            return  {thrown:true, status:401,  message: "incorrect comment id"};
      }
      let resultCommentById = await CommentRepo.findById(comment.id);
      if(!resultCommentById){
         return  {thrown:true, status:409,  message: "this comment does not exist"};
      }

      Object.keys( resultCommentById).forEach(item =>{
              if(comment[item] && comment[item] !== undefined){
                  resultCommentById[item] = comment[item];
              }
      });

      let savedResult = await resultCommentById.save();
      if(savedResult.errors){
          return  {status:422,  message: "db is currently unable to process request"};
      }

      return savedResult;
  }

  async getAllCommentsByUserId(userId:any):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
       if(! objectId.isValid(userId) ){
            return  {thrown:true, status:401,  message: "incorrect user id"};
      }
      let commentsByUserRefResult = await CommentRepo.find({ userRef:userId});
      if(!commentsByUserRefResult){
            return  {thrown:true, status:401,  message: "no comments from user with an id "+userId+" currently exist"};
      }
      return commentsByUserRefResult;
  }

  async getAllCommentsByBookId(bookId:string):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
       if(! objectId.isValid(bookId) ){
            return  {thrown:true, status:401,  message: "incorrect book id"};
      }
      let commentsByBookRefResult = await CommentRepo.find({ bookRef:bookId});
      if(!commentsByBookRefResult){
            return  {thrown:true, status:401,  message: "no comments from book with an id "+bookId+" currently exist"};
      }
      return commentsByBookRefResult;
  }


  async deleteComment(commentId:string):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(commentId)){
            return  {thrown:true, status:401,  message: "incorrect comment id"};
      }
      let deleteCommentResult = await CommentRepo.findByIdAndRemove(commentId);
      if(deleteCommentResult.errors){
          return  {status:422,  message: "db is currently unable to process request"};
      }
      return deleteCommentResult;
  }

}


