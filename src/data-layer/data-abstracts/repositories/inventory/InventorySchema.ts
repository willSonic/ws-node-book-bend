import { Schema } from "mongoose";
import { CommentSchema, ICommentDocument } from '../comment';
import { IInventoryDocument } from './IInventoryDocument';

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
  available: {
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
InventorySchema.pre("save", function (next : any) {
      if (this) {
        let doc = <IInventoryDocument>this;
        let now = new Date();

        if (!doc.createdAt) {
          doc.createdAt = now;
        }

        doc.modifiedAt = now;

      }

      next();
});
export { InventorySchema };
