import { Schema } from "mongoose";

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
                required: true
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
                required: true
             },
  title: {
            type: String,
            required: true
         },
  categories:  [{ type: String }],
  ratingsCount: {
                  type: Number,
                },
  publishedDate: Date,
  publisher: {
                type: String,
                required: true
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


export { BookSchema };
