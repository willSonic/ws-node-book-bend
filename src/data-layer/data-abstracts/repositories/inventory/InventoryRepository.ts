import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Model } from "mongoose";
import { InventorySchema } from './InventorySchema';
import { IInventoryDocument } from './IInventoryDocument';

export type InventoryMod = Model<IInventoryDocument>;

export const InventoryRepo:InventoryMod = MongooseAccess.
  mongooseConnection.
  model<IInventoryDocument>("inventory", InventorySchema);
