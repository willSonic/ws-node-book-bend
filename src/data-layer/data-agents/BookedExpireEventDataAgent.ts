import mongoose = require('mongoose');
import {
  BookedExpireEventRepo,
  IBookedExpireEventDocument,
  BookedExpireEventSchema
  } from '../data-abstracts/repositories/booked';

import { logger } from '../../middleware/common/logging';
import { IInventoryDocument } from '../data-abstracts/repositories/inventory';



export class BookedExpireEventDataAgent{
    async createBookedExpireEvent( bookedExpireEvent:any):Promise<any> {
      let newBExpiredEvent = <IBookedExpireEventDocument>(bookedExpireEvent);
      let previousBExpiredEvent = BookedExpireEventRepo.findOne(
        {bookedRef:bookedExpireEvent.bookedRef }
        );
      if(previousBExpiredEvent){
         return  {  thrown:true,
                    success:false,
                    status:409,
                    message: "BookedExpireEvent for this Booked  entity was previously established"
                    };
      }
      let bookedExpireEventResult =  await BookedExpireEventRepo.create(newBExpiredEvent );
      if(bookedExpireEventResult.errors){
          return  {thrown:true,
                   success:false,
                   status:422,
                   message: "db is currently unable to process BookedExpireEventRepo create request"};
      }
      return bookedExpireEventResult
    }
}
