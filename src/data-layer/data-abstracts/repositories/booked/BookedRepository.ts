import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Model } from "mongoose";
import { BookedSchema } from './BookedSchema';
import { IBookedDocument} from './IBookedDocument';

export type BookedMod = Model<IBookedDocument>;

export const BookedRepo:BookedMod =
MongooseAccess.mongooseConnection.model<IBookedDocument>("booked", BookedSchema);

