import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Model } from "mongoose";
import { BookedExpireEventSchema } from './BookedExpireEventSchema';
import { IBookedExpireEventDocument} from './IBookedExpireEventDocument';
import { logger } from '../../../../middleware/common/logging';
import { getExpireTime} from '../../../../business-layer/utils/bizRules';

export type BookedExpireEventMod = Model<IBookedExpireEventDocument>;

const BookedExpireEventRepo:BookedExpireEventMod =
MongooseAccess.mongooseConnection.model<IBookedExpireEventDocument>
    ("booked_expire_event", BookedExpireEventSchema);


BookedExpireEventRepo.watch().on('change', (change)=>{
       console.log('BookExpireEventRepo   -- change.operationType === ', change.operationType );
       console.log('BookExpireEventRepo   -- getExpireTime === ', getExpireTime()/1000 );
    if(change.operationType === 'delete') {
        console.log('BookExpireEventRepo   -- change.documentKey._id =', change.documentKey._id);
        logger.info('BookExpireEventRepo   -- change.documentKey._id =', change.documentKey._id);
    }
});

export { BookedExpireEventRepo };
