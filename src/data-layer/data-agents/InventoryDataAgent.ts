import mongoose = require('mongoose');
import { InventoryRepo, IInventoryDocument} from '../data-abstracts/repositories/inventory';
import { logger } from '../../middleware/common/logging';

export class InventoryDataAgent{

  async createNewInventory(inventory:any):Promise<any> {
      let newInventory = <IInventoryDocument>(inventory);
      let previousInventory =  await InventoryRepo.findOne({ bookGoogleId: inventory.book.id});
      if(previousInventory){
         return  {thrown:true, success:false, status:409,  message: "inventory for this book was previously established"};
      }
      let newInventoryResult =  await InventoryRepo.create(newInventory);
      if(newInventoryResult.errors){
          return  {thrown:true, success:false,  status:422,  message: "db is currently unable to process request"};
      }
      return newInventoryResult;
  }

 async updateInventory(inventory:any):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(inventory.id)){
            return  {thrown:true, status:401,  message: "incorrect inventory id"};
      }

      let updatedInventory = await InventoryRepo.findById(inventory.id);
      if(!updatedInventory){
         return  {thrown:true, status:409,  message: "an inventory for the book ref does does not exist"};
      }
      Object.keys( updatedInventory).forEach(item =>{
              if(inventory[item] && inventory[item] !== undefined){
                  updatedInventory[item] = inventory[item];
              }
        });
      let savedResult = await updatedInventory.save();
      if(savedResult.errors){
          return  {status:422,  message: "db is currently unable to process request"};
      }

      return savedResult;
  }


  async getInventoryByGoogleId(googleId):Promise<any>{
      let inventoryForBook =  await InventoryRepo.find({ "bookGoogleId" : googleId});
      if(!inventoryForBook){
            return  {thrown:true, status:404,  message: "inventory does not exit for this book"};
      }
      return inventoryForBook;

  }

  async getInventoryByBookRef(bookRef:string):Promise<any> {
      let inventoryForBook =  await InventoryRepo.findOne({ bookRef : bookRef});
      if(!inventoryForBook){
            return  {thrown:true, status:404,  message: "inventory does not exit for this book"};
      }
      return inventoryForBook;
  }



  async deleteInventory(inventoryId:string):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(inventoryId)){
            return  {thrown:true, status:401,  message: "incorrect inventory id"};
      }
      let deleteInventoryResult = await InventoryRepo.findByIdAndRemove(inventoryId);
      if(deleteInventoryResult.errors){
          return  {status:422,  message: "db is currently unable to process request"};
      }
      return deleteInventoryResult;
  }


}
