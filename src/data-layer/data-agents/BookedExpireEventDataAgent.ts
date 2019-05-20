import {
  BookedExpireEventRepo,
  IBookedExpireEventDocument,
  } from '../data-abstracts/repositories/booked';

import { logger } from '../../middleware/common/logging';
import {
  NotFound_404,
  Conflict_409,
  Unprocessable_422,
} from '../../business-layer/utils/errors/ApplicationError';

export class BookedExpireEventDataAgent{
    async createBookedExpireEvent( bookedId:string):Promise<any> {
      let previousBExpiredEvent = await BookedExpireEventRepo.findOne(
        {booked:bookedId }
        );
      if(previousBExpiredEvent && previousBExpiredEvent.id){
         throw  new  Conflict_409( `A BookedExpireEvent for this Booked with id ${bookedId} entity was previously established!`)
      }
      let bookedExpireEventResult =  await BookedExpireEventRepo.create({booked:bookedId } );
      if(bookedExpireEventResult.errors){
          throw new Unprocessable_422("The DataBase currently unable to process BookedExpireEventRepo create request");
      }
      return bookedExpireEventResult
    }
}
