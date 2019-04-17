import { Route, Response, Get, Post, Patch, Header, Body, Security, Controller, Path, Delete } from 'tsoa';

import { ICommentCreateRequest, ICommentUpdateRequest } from '../request';
import { ICommentResponse, ICommentResponses, IErrorResponse } from '../responses';
import { CommentModel } from '../../data-layer/models/CommentModel';
import { DataAgentServices as dataAgent } from '../../data-layer/data-agents';
import { logger } from '../../middleware/common/logging';

@Route('Comments')
export class CommentsController extends Controller{

  @Security('api_key')
  @Post()
  public async CreateNewComment(
    @Body()  request:ICommentCreateRequest,
    @Header('x-access-token') authentication: string
  ): Promise<ICommentResponse> {
      let result = await dataAgent.commentDA.createNewComment(request);
      if(result.id){
         return <ICommentResponse>( new CommentModel(result))
      }else{
          throw result;
      }
  }


  @Security('api_key')
  @Patch()
  public async UpdateComment(
    @Body()  request:ICommentUpdateRequest,
    @Header('x-access-token') authentication: string
  ): Promise<ICommentResponse> {
      let result = await dataAgent.commentDA.updateComment(request);
      if(result.id){
         return <ICommentResponse>( new CommentModel(result))
      }else{
          throw result;
      }
  }


  @Security('api_key')
  @Get('byUser/{userId}')
    public async GetAllCommentsFromAUser(
    @Path() userId: string,
    @Header('x-access-token') authentication: string
    ): Promise<ICommentResponses> {
    const results = await dataAgent.commentDA.getAllCommentsByUserId(userId);
    if(!results.hasOwnProperty('throw')){
         let userComments = results.map( comment => new CommentModel(comment));
         return <ICommentResponses>( userComments)
    } else{
       throw results;
    }

  }

  @Security('api_key')
  @Get('onBook/{bookId}')
    public async GetAllCommentsOnBook(
    @Path() bookId: string,
    @Header('x-access-token') authentication: string
    ): Promise<ICommentResponses> {
    const results = await dataAgent.commentDA.getAllCommentsByBookId(bookId);
    if(!results.hasOwnProperty('throw')){
         let userComments = results.map( comment => new CommentModel(comment));
         return <ICommentResponses>( userComments)
    } else{
       throw results;
    }
  }



  @Security('api_key')
  @Delete('{commentId}')
  public async DeleteExistingCommentById(
    @Path() commentId: string,
    @Header('x-access-token') authentication: string
  ): Promise<ICommentResponse> {
      let result = await dataAgent.commentDA.deleteComment(commentId);
      if(result.id){
         return <ICommentResponse>( new CommentModel(result))
      }else{
          throw result;
      }
    }
}
