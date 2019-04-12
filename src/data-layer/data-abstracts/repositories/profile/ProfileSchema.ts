import { Schema } from "mongoose";
import { IProfileDocument } from './IProfileDocument';

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */

 const ProfileSchema:Schema = new Schema({

  userRef:{
        type: Schema.Types.ObjectId,
        ref: 'User',
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
  messageRefs:[{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
        }],

 // comment id
  commentRefs:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
         required: true,
        }],

 // bookedRefs
   bookedRefs:[{
        type: Schema.Types.ObjectId,
        ref: 'Booked',
       required: true,
        }],

// waitlistRefs
   waitlistRefs:[{
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true,
        }],
//interest catagories from books checked out
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
