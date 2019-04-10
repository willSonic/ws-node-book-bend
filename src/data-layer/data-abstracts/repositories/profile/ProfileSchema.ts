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

  messageRefs:[{
       type: String,
       required: true,
        }],

  commentRefs:[{
       type: String,
       required: true,
        }],

  createdAt: {
	   type: Date,
	   default : Date.now
  },

  modifiedAt: {
	   type: Date,
	   default : Date.now
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
