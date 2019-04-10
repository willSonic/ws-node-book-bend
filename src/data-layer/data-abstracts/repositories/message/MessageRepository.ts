import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Model } from "mongoose";
import { MessageSchema } from './MessageSchema';
import { IMessageDocument } from './IMessageDocument';

export type MessageMod = Model<IMessageDocument>;

export const MessageRepo:MessageMod =
      MongooseAccess.mongooseConnection.model<IMessageDocument>("message", MessageSchema);
