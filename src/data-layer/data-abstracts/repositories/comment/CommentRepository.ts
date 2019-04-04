import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Model } from "mongoose";
import { CommentSchema } from './CommentSchema';
import { ICommentDocument } from './ICommentDocument';

export type CommentMod = Model<ICommentDocument>;

export const CommentRepo:CommentMod = MongooseAccess.mongooseConnection.model<ICommentDocument>("comment", CommentSchema);

