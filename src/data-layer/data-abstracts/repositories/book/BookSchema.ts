import { Schema } from "mongoose";
import { IInventoryDocument, InventorySchema } from '../inventory';
import { IBookDocument } from './IBookDocument';

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
const BookSchema:Schema = new Schema({
  googleId:{
         type: String,
         required: true,
       },
  authors: [{
       type: String,
       required: true,
        }],
  averageRating: {
                   type: Number,
                    max: 255,
                    min: 0,
                 },
  description: {
                type: String,
                required: true,
                max: 750,
             },
  imageLinks: {
    type: new Schema({
      smallThumbnail: {
         type: String,
      },
      thumbnail: {
        type: String,
      },
    }),
  },

  pageCount:  {
                    type: Number
                },
  subtitle: {
                type: String,
             },
  title: {
            type: String,
         },

  categories:  [{ type: String }],

  ratingsCount: {
                  type: Number,
                },
  publishedDate: Date,
  publisher: {
                type: String,
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
BookSchema.pre("save", function (next : any) {
      if (this) {
        let doc = <IBookDocument>this;
        let now = new Date();

        if (!doc.createdAt) {
          doc.createdAt = now;
        }

        doc.modifiedAt = now;

      }

      next();
});

export { BookSchema };
