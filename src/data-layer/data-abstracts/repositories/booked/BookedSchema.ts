import { Schema } from "mongoose";
import { IBookedDocument} from './IBookedDocument';
import { borrowerRules, createDate } from '../../../../business-layer/utils/bizRules';

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
 const  BookedSchema:Schema = new Schema({
   User:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
  },
  bookRef:{
        type: Schema.Types.ObjectId,
        ref: 'book',
        required: true,
  },

  returnDate: {
      type: Date,
      default: createDate(borrowerRules.twoMinMS),
      required: true,
  },

  active:{
      type: Boolean,
      default:true,
  },

  createdAt: {
	   type: Date,
	   default : Date.now(),
  },

  modifiedAt: {
	   type: Date,
	   default : Date.now(),
  }
});

BookedSchema.pre("save", function (next : any) {
      if (this) {
        let doc = <IBookedDocument>this;
        let now = new Date();

        if (!doc.createdAt) {
          doc.createdAt = now;
        }

        doc.modifiedAt = now;

      }

      next();
});


export { BookedSchema };
