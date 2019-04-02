
import mongoose = require('mongoose');
import { BookRepo, BookSchema, IBookDocument} from '../data-abstracts/repositories/book';
import { logger } from '../../middleware/common/logging';


export class BookDataAgent{

  async createNewBook(book:any):Promise<any> {
      let newBook = <IBookDocument>(book);
      let previousBook =  await BookRepo.findOne({ googleId : newBook.googleId});
      if(previousBook){
         return  {thrown:true, success:false, status:409,  message: "Book has already been added"};
      }
      let newBooResult =  await BookRepo.create(newBook);
      if(newBooResult.errors){
          return  {thrown:true, success:false,  status:422,  message: "db is currently unable to process request"};
      }
      return newBooResult;
  }

  async getBookByTitle(title:string):Promise<any> {
      let book =  await BookRepo.find({ title : title});
      if(!book){
            return  {thrown:true, status:404,  message: "title does not exit"};
      }
      return book;
  }

  async getBookById( googleId:string):Promise<any>{
      let book =  await BookRepo.findOne({ googleId : googleId});
      if(!book){
            return  {status:401,  message: "incorrect googleId for Book"};
      }
      return book;
  }


  async deleteExistingBook(bookId:string):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(bookId)){
            return  {thrown:true, status:401,  message: "incorrect book id"};
      }
      let deleteBookResult = await BookRepo.findByIdAndRemove(bookId);
      if(deleteBookResult.errors){
          return  {status:422,  message: "db is currently unable to process request"};
      }
      return deleteBookResult;
  }
}

