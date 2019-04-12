import mongoose = require('mongoose');
import { BookRepo, BookSchema, IBookDocument} from '../data-abstracts/repositories/book';
import { logger } from '../../middleware/common/logging';


export class BookDataAgent{

  async createNewBook(book:any):Promise<any> {
      let newBook = <IBookDocument>(book);
      let previousBook =  await BookRepo.findOne({ googleId : newBook.googleId});
      if(previousBook){
         return  {
            thrown:true,
            success:false,
            status:409,
            message: "Book has already been added"
         };
      }
      let newBookResult =  await BookRepo.create(newBook);
      if(newBookResult.errors){
          return  {
            thrown:true,
            success:false,
            status:422,
            message: "db is currently unable to insert new Book request"
            };
      }
      return newBookResult;
  }

  async getBookByTitle(title:string):Promise<any> {
      let book =  await BookRepo.find({ title : title});
      if(!book){
            return  {
              thrown:true,
              status:404,
              message: "title does not exit"
            };
      }
      return book;
  }

  async getBookByGoogleId( googleId:string):Promise<any>{
      let book =  await BookRepo.findOne({ googleId : googleId});
      if(!book){
            return  {status:401,  message: "incorrect googleId for Book"};
      }
      return book;
  }

  async getBookById( bookId:string):Promise<any>{
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(bookId)){
            return  {status:401,  message: "incorrect book id"};
      }
      console.info('BookDataAgent-- getBookById - bookId =', bookId)
      let bookResult = await BookRepo.findById(bookId);
      if(bookResult.errors){
          return  {
            thrown:true,
            status:422,
            message: "db is currently  unable to process Book find by Id request"
            };

      }
      return bookResult;
  }

  async deleteExistingBook(bookId:string):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(bookId)){
            return  {
             thrown:true,
              status:401,
              message: "incorrect book id"
              };
      }
      let deleteBookResult = await BookRepo.findByIdAndRemove(bookId);
      if(deleteBookResult.errors){
          return  {
           thrown:true,
           success:false,
           status:422,
           message: "db is currently unable to process this Book delete request"};
      }
      return deleteBookResult;
  }
}

