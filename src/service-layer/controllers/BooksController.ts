import {
Route, Response, Get, Post,
Header, Body, Security, Controller,
Delete, Path } from 'tsoa';

import { IBookCreateRequest } from '../request';
import { IBookResponse, IErrorResponse, IUserResponse } from '../responses';
import { BookModel } from '../../data-layer/models/BookModel';
import { DataAgentServices as dataAgent } from '../../data-layer/data-agents';
import { logger } from '../../middleware/common/logging';


@Route('Books')
export class BooksController extends Controller{
  @Security('api_key')
  @Post()
  public async CreateNewBook(
    @Body()  request:IBookCreateRequest,
    @Header('x-access-token') authentication: string ):Promise<IBookResponse>{
     if( !request.userId ){
       let result = await dataAgent.bookDA.createNewBook(request);
       if(result.id){
         return <IBookResponse>(new BookModel(result));
       }else{
          throw result;
       }
     }else{

     }
  }

  @Security('api_key')
  @Get('bookTitle/{title}')
  public async GetBookByTitle(
    @Path() title: string,
    @Header('x-access-token') authentication: string ):Promise<IBookResponse>{
      let result = await dataAgent.bookDA.getBookByTitle(title);
      if( result && result.googleId){
         return <IBookResponse>(new BookModel(result));
      }else{
          if(result){
              throw result;
          }else{
              throw{
                   thrown:true,
                   status: 404,
                   message: 'no such book with current title exist'
              }
          }
      }
  }


  @Security('api_key')
  @Get('fromGoogle/{googleId}')
  public async GetBookByGoogleId(
    @Path() googleId: string,
    @Header('x-access-token') authentication: string ):Promise<IBookResponse>{
      let result = await dataAgent.bookDA.getBookByGoogleId(googleId);
      if( result && result.title){
         return <IBookResponse>(new BookModel(result));
      }else{
          if(result){
              throw result;
          }else{
              throw{
                   thrown:true,
                   status: 404,
                   message: 'no such book with Google Id  exist'
              }

          }
      }
  }


  @Security('api_key')
  @Get('book/{bookId}')
  public async GetBookById(
    @Path() bookId: string,
    @Header('x-access-token') authentication: string ):Promise<IBookResponse>{
      let result = await dataAgent.bookDA.getBookById(bookId);
      if( result && result.title){
         return <IBookResponse>(new BookModel(result));
      }else{
          if(result){
              throw result;
          }else{
              throw{
                   thrown:true,
                   status: 404,
                   message: 'no such book this id   exist'
              }
          }
      }
  }





  @Security('api_key')
  @Delete('{bookId}')
  public async DeleteExistingBookById(
    @Path() bookId: string,
    @Header('x-access-token') authentication: string ): Promise<IBookResponse> {
       let result = await dataAgent.bookDA.deleteExistingBook(bookId);
       if(result.id){
         return <IBookResponse>(new BookModel(result));
       }else{
          throw result;
       }
  }
}
