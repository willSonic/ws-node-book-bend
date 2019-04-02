import { Schema } from "mongoose";

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
const InventorySchema:Schema = new Schema({
  bookRef:{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
  currentUserRef:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
  availStatus: {
        type: Boolean,
        default:false,
       },
  checkOutDate: {
          type:Date
        },
   returnDate: {
          type:Date
        },
    waitList: [{
            userRef:{
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            requestDate: Date,
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

export { InventorySchema };
