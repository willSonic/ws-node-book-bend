import { Schema } from "mongoose";
import { IMessageDocument } from './IMessageDocument';

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */

 const MessageSchema:Schema = new Schema({

  user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
  },

  messageType:{
        type: String,
  },

  messageText:{
        type: String,
  },

  reviewedAt:{
	   type: Date,
  },

  createdAt: {
	   type: Date,
	   default : Date.now()
  },

  modifiedAt: {
	   type: Date,
	   default : Date.now()
  }

});



MessageSchema.pre("save", function (next : any) {
      if (this) {
        let doc = <IMessageDocument>this;
        let now = new Date();

        if (!doc.createdAt) {
          doc.createdAt = now;
        }

        doc.modifiedAt = now;

      }

      next();
});


export {MessageSchema };
