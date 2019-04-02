import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Model } from "mongoose";
import { BookSchema } from './BookSchema';
import { IBookDocument} from './IBookDocument';

export type BookMod = Model<IBookDocument>;

export const BookRepo:BookMod = MongooseAccess.mongooseConnection.model<IBookDocument>("book", BookSchema);

