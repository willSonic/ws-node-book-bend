import { InventoryRepo, IInventoryDocument} from '../data-abstracts/repositories/inventory';
import { logger } from '../../middleware/common/logging';
import { Conflict_409, NotFound_404, Unprocessable_422 } from '../../business-layer/utils/errors/ApplicationError';

export class InventoryDataAgent{

  async createNewInventory(inventory:any):Promise<any> {
      let newInventory = <IInventoryDocument>(inventory);
      let previousInventory =  await InventoryRepo.findOne({ bookGoogleId: inventory.bookGoogleId});
      if(previousInventory){
         throw  new  Conflict_409( `An Inventory with a googleId ${inventory.bookGoogleId} was previously established!`);
      }
      let newInventoryResult =  await InventoryRepo.create(newInventory);
      if(newInventoryResult.errors){
          throw new Unprocessable_422(`The DataBase is unable to process an Inventory create request`);
      }
      return newInventoryResult;
  }

 async updateInventory(inventory:any):Promise<any> {
      let updatedInventory = await InventoryRepo.findById(inventory.id);
      if(!updatedInventory){
          throw new Conflict_409(`Can not update Inventory id ${inventory.id } as it does not exist`);
      }
      Object.keys( updatedInventory).forEach(item =>{
              if(inventory[item] && inventory[item] !== undefined){
                  updatedInventory[item] = inventory[item];
              }
        });
      let savedResult = await updatedInventory.save();
      if(savedResult.errors){
          throw new Unprocessable_422(`The DataBase is unable to update Inventory with id ${inventory.id} request`);
      }
      return savedResult;
  }


  async getInventoryByGoogleId(googleId):Promise<any>{
      let inventoryForBook =  await InventoryRepo.find({ "bookGoogleId" : googleId});
      if(! inventoryForBook){
          throw new NotFound_404(`An Inventory with goolgeId of ${googleId } does not currently exist`);
      }
      return inventoryForBook;

  }

  async getInventoryByBookRef(bookRef:string):Promise<any> {
      let inventoryForBook =  await InventoryRepo.findOne({ bookRef : bookRef});
      if(!inventoryForBook){
          throw new NotFound_404(`An Inventory with a bookRef of ${bookRef } does not currently exist`);
      }
      return inventoryForBook;
  }



  async deleteInventory(inventoryId:string):Promise<any> {
      let deleteInventoryResult = await InventoryRepo.findByIdAndRemove(inventoryId);
      if(deleteInventoryResult.errors){
          throw new Unprocessable_422(`The DataBase is unable to process Inventory with id ${inventoryId} delete request`);
      }
      return deleteInventoryResult;
  }


}
