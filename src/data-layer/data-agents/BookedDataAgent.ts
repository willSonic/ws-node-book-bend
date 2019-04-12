import mongoose = require('mongoose');
import {
  BookedRepo,
  IBookedDocument
} from '../data-abstracts/repositories/booked';
import { logger } from '../../middleware/common/logging';
import { borrowerRules, createDate } from '../../business-layer/utils/bizRules';


export class BookedDataAgent{

  async createNewBooked(booked:any):Promise<any> {
      let newBooked = <IBookedDocument>(booked);

      let previousBooked =  await BookedRepo.findOne(
        { userRef : newBooked.userRef, bookRef:newBooked.bookRef }
        );
      if(previousBooked){
         previousBooked.active = true;
         previousBooked.returnDate = createDate( borrowerRules.twoMinMS);
         previousBooked = await previousBooked.save();
         if(previousBooked.errors){
          return  {
             thrown:true,
             status:422,
             message: "db is currently save Update to previous Booked request"};
         }
         return previousBooked;
      }

      let newBookedResult =  await BookedRepo.create(newBooked);
      if(newBookedResult.errors){
          return  {
            thrown:true,
            success:false,
            status:422,
            message: "db is currently unable to insert new Booked request"
            };
      }
      return newBookedResult;
  }


  async getBookedById( bookedId:string):Promise<any>{
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(bookedId)){
            return  {status:401,  message: "incorrect bookedId id"};
      }
      let bookedResult = await BookedRepo.findById(bookedId);
      if(bookedResult.errors){
          return  {
            thrown:true,
            status:422,
            message: "db is currently  unable to process Booked find by Id request"
            };

      }
      return bookedResult;
  }

  async getBookedByUserRef(userRef:string):Promise<any> {
      let userBookRefs =  await BookedRepo.find({ userRef : userRef});
      if(!userBookRefs){
            return  {
              thrown:true,
              status:404,
              message: "User does not have any Booked "
            };
      }
      return userBookRefs;
  }

  async getBookedByBookRef( bookRef:string):Promise<any>{
      let booked =  await BookedRepo.findOne({ bookRef : bookRef});
      if(!booked){
            return  {status:401,  message: "incorrect Booked"};
      }
      return booked;
  }


}
