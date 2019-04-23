import mongoose = require('mongoose');
import {
  BookedExpireEventRepo,
  IBookedExpireEventDocument,
  } from '../data-abstracts/repositories/booked';

import { logger } from '../../middleware/common/logging';
import { IInventoryDocument } from '../data-abstracts/repositories/inventory';

export class BookedExpireEventDataAgent{
    async createBookedExpireEvent( bookId:string):Promise<any> {
      let previousBExpiredEvent = await BookedExpireEventRepo.findOne(
        {booked:bookId }
        );
      if(previousBExpiredEvent && previousBExpiredEvent.id){
         return  {  thrown:true,
                    success:false,
                    status:409,
                    message: "BookedExpireEvent for this Booked  entity was previously established"
                    };
      }
      let bookedExpireEventResult =  await BookedExpireEventRepo.create({booked:bookId } );

      if(bookedExpireEventResult.errors){
          return  {thrown:true,
                   success:false,
                   status:422,
                   message: "db is currently unable to process BookedExpireEventRepo create request"};
      }
      return bookedExpireEventResult
    }
}
