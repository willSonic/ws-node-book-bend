import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Model } from "mongoose";
import { BookedExpireEventSchema } from './BookedExpireEventSchema';
import { IBookedExpireEventDocument} from './IBookedExpireEventDocument';
import { logger } from '../../../../middleware/common/logging';

export type BookedExpireEventMod = Model<IBookedExpireEventDocument>;

const BookedExpireEventRepo:BookedExpireEventMod =
MongooseAccess.mongooseConnection.model<IBookedExpireEventDocument>
    ("booked", BookedExpireEventSchema);


BookedExpireEventRepo.watch().on('change', (change)=>{
    if(change.operationType === 'delete') {
        console.log('BookExpireEventRepo   -- change.documentKey._id =', change.documentKey._id);
        logger.info('BookExpireEventRepo   -- change.documentKey._id =', change.documentKey._id);
    }
});

export { BookedExpireEventRepo };
