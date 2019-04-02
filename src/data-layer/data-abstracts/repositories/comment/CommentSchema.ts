import { Schema } from "mongoose";

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
const CommentSchema:Schema = new Schema({

  text: {
     maxlength: 600,
     minlength: 5,
     required: true,
     trim: true,
  },
  bookRef:{
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
  },
  userRef:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
  },
  createdAt: {
	   type: Date,
	   default : Date.now
  },

  modifiedAt: {
	   type: Date,
	   default : Date.now
  }

});


export { CommentSchema };
