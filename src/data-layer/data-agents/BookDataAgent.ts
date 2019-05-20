import { BookRepo, BookSchema, IBookDocument} from '../data-abstracts/repositories/book';
import  {
    Unprocessable_422,
    Conflict_409,
    NotFound_404,

} from '../../business-layer/utils/errors/ApplicationError';

import { logger } from '../../middleware/common/logging';


export class BookDataAgent{
  async createNewBook(book:any):Promise<any> {
      let newBook = <IBookDocument>(book);
      let previousBook =  await BookRepo.findOne({ googleId : newBook.id});
      if(previousBook){
         throw new Conflict_409(`A book with an id of ${book.googleId} previously created!`)
      }
      let newBookResult =  await BookRepo.create(newBook);
      if(newBookResult.errors){
          throw new Unprocessable_422("The DataBase is currently unable to insert new Book request");
      }
      return newBookResult;
  }

  async getBookByTitle(title:string):Promise<any> {
      let book =  await BookRepo.find({ title : title});

      if(!book){
         throw  new  NotFound_404(`There is no book present with a title ${ title }!`);
      }
      return book;
  }

  async getBookByGoogleId( googleId:string):Promise<any>{
      let book =  await BookRepo.findOne({ googleId : googleId});
      if(!book){
         throw  new  NotFound_404( `There is no book present with a googleId, of${ googleId }!`);
      }
      return book;
  }

  async getBookById( bookId:string):Promise<any>{
      let bookResult = await BookRepo.findById(bookId);
      if(!bookResult){
         throw  new  NotFound_404( `There is no book present with an id, of ${bookId}!`)
      }
      return bookResult;
  }

  async deleteExistingBook(bookId:string):Promise<any> {
      let deleteBookResult = await BookRepo.findByIdAndRemove(bookId);
      if(deleteBookResult.errors){
          throw new Unprocessable_422("The DataBase is currently unable complete Book delete request");
      }
      return deleteBookResult;
  }
}

