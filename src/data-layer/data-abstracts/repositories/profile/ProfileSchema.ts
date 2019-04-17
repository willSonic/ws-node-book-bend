import { Schema } from "mongoose";
import { IProfileDocument } from './IProfileDocument';

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */

 const ProfileSchema:Schema = new Schema({

  user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
  },
  checkedOutCount:  {
                    type: Number,
                    default : 0,
                },

  waitListCount:  {
                    type: Number,
                    default : 0
                },

 // message id
  messages:[{
        type: Schema.Types.ObjectId,
        ref: 'message',
        required: true,
  }],

 // comment id
  comments:[{
        type: Schema.Types.ObjectId,
        ref: 'comment',
         required: true,
        }],

 // bookedRefs
   booksOut:[{
        type: Schema.Types.ObjectId,
        ref: 'booked',
        required: true,
        }],

// waitlistRefs
   inventories:[{
        type: Schema.Types.ObjectId,
        ref: 'inventory',
        required: true,
        }],
//interest categories from books checked out
   interestCategories:[{
        type: String,
        required: true,
        }],

  createdAt: {
	   type: Date,
	   default : Date.now()
  },

  modifiedAt: {
	   type: Date,
	   default : Date.now()
  }

});



ProfileSchema.pre("save", function (next : any) {
      if (this) {
        let doc = <IProfileDocument>this;
        let now = new Date();

        if (!doc.createdAt) {
          doc.createdAt = now;
        }

        doc.modifiedAt = now;

      }

      next();
});


export { ProfileSchema };
