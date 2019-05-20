import {
  BookedRepo,
  IBookedDocument
} from '../data-abstracts/repositories/booked';
import { logger } from '../../middleware/common/logging';
import { UserRepo } from '../data-abstracts/repositories/user';
import { getExpireTime, createDate } from '../../business-layer/utils/bizRules';
import { Conflict_409, NotFound_404, Unprocessable_422 } from '../../business-layer/utils/errors/ApplicationError';


export class BookedDataAgent{

  async createNewBooked(booked:any):Promise<any> {
      let newBooked = <IBookedDocument>(booked);

      let previousBooked =  await BookedRepo.findOne(
        { user : newBooked.user, book:newBooked.book }
        );
      if(previousBooked){
         previousBooked.active = true;
         previousBooked.returnDate = createDate( getExpireTime() );
         previousBooked = await previousBooked.save();
         if(previousBooked.errors){
             throw new Unprocessable_422("The DataBase is unable to create(update)  Booked request");
          }
         return previousBooked;
      }

      let newBookedResult =  await BookedRepo.create(newBooked);
      if(newBookedResult.errors){
             throw new Unprocessable_422("The DataBase is unable to create Booked request");
      }
      return newBookedResult;
  }

  async updateBooked(booked:any):Promise<any>{
      let resultBookedById = await BookedRepo.findById(booked.id);
      if(!resultBookedById){
         throw new Conflict_409(`A booked record  with an id of ${booked.id} does not exist!`);
      }

      Object.keys( resultBookedById).forEach(item =>{
              if(booked[item] && booked[item] !== undefined){
                  resultBookedById[item] = booked[item];
              }
        });
      let savedResult = await resultBookedById.save();

      if(savedResult.errors){
         throw  new  Unprocessable_422( `The DataBase is unable to update Booked record with an id of ${booked.id}`);
      }
      return savedResult;
  }

  async getBookedById( bookedId:string):Promise<any>{
      let bookedResult = await BookedRepo.findById(bookedId);
      if(bookedResult.errors){
          throw new Unprocessable_422(`The DataBase is unable to update Booked record with an id of ${bookedId}`);
      }
      return bookedResult;
  }

  async getBookedByUserRef(userRef:string):Promise<any> {
      let userBookRefs =  await BookedRepo.find({ userRef : userRef});
      if(!userBookRefs){
         throw  new  NotFound_404( `A User with an id of  ${userRef} does not have any Booked instances!`)
      }
      return userBookRefs;
  }

  async getBookedByBookRef( bookRef:string):Promise<any>{
      let booked =  await BookedRepo.findOne({ bookRef : bookRef});
      if(!booked){
         throw  new  NotFound_404( ` A Booked record with an id of ${bookRef} does not have existed!`);
      }
      return booked;
  }

}
