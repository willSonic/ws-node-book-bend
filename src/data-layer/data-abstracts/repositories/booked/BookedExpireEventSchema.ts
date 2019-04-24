import { Schema } from "mongoose";
import { IBookedExpireEventDocument} from './IBookedExpireEventDocument';
import { getExpireTime} from '../../../../business-layer/utils/bizRules';
/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
 const  BookedExpireEventSchema:Schema = new Schema({
  booked:{
        type: Schema.Types.ObjectId,
        ref: 'booked',
        required: true,
  },
  createdAt: {
	   type: Date,
	   default : Date.now(),
  },
}
//production you want to set autoIndex to false to remove performance hit
//,  { autoIndex: false }
);

BookedExpireEventSchema.index(
{createdAt:1},
{expireAfterSeconds: (getExpireTime()/1000) }
);

export { BookedExpireEventSchema };

