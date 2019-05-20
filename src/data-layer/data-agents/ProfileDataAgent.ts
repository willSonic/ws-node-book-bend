import {
 ProfileRepo,
 IProfileDocument
 } from '../data-abstracts/repositories/profile';
import { logger } from '../../middleware/common/logging';
import { Conflict_409, NotFound_404, Unprocessable_422 } from '../../business-layer/utils/errors/ApplicationError';


export class ProfileDataAgent{

  async createNewProfile(userId:string):Promise<any> {
      let previousProfile =  await ProfileRepo.findOne({ user : userId});
      if(previousProfile){
         throw  new  Conflict_409( `A new Profile can be created because User with an id ${userId} does not exist!`);
      }
      try{
         let newProfileResult =  await ProfileRepo.create({ user : userId});
         let newProfileWithSubs = await newProfileResult.populate('user')
        .execPopulate();
          return newProfileWithSubs;
      }catch(error){
          throw new Unprocessable_422(`The DataBase is unable to create a new Profile`);
      }
  }

  async getProfileById(profileId:string):Promise<any> {
   let profile =  await ProfileRepo.findById( profileId)
        .populate('user')
        .populate('messages')
        .populate('comments')
        .populate({ path:'booksOut', populate:{ path:'book' }})
        .populate('inventories');
      if(!profile){
         throw  new  NotFound_404( `A Profile with an id ${profileId}  does not exist!`);
      }
      return profile;
  }
  async getProfileByUserId(userId:string):Promise<any> {
      let profile =  await ProfileRepo.findOne({ user : userId})
        .populate('user')
        .populate('messages')
        .populate('comments')
        .populate({ path:'booksOut', populate:{ path:'book' }})
        .populate({ path:'inventories.waitList', match:{userId: {   $eq: userId} }});
      if(!profile){
         throw  new  NotFound_404( `A Profile with user id ${userId} entity does not exist!`);
      }
      return profile;
  }

  async updateProfile(profile:any):Promise<any> {
      let resultProfileById = await ProfileRepo.findById(profile.id);
      if(!resultProfileById){
         throw  new  NotFound_404( `A Profile with id ${profile.id} entity does not exist!`);
      }
      Object.keys( resultProfileById).forEach(item =>{
              if(profile[item] && profile[item] !== undefined){
                  resultProfileById[item] = profile[item];
              }
        });
      let savedResult = await resultProfileById.save();
     savedResult = savedResult.populate('user')
        .populate('messages')
        .populate('comments')
        .populate({ path:'booksOut', populate:{ path:'book' }})
        .populate({ path:'inventories'});
      if(savedResult.errors){
          throw new Unprocessable_422(`The DataBase is unable to update a Profile with id ${profile.id}`);
      }

      return savedResult;
  }
  async deleteExistingProfile(profileId:string):Promise<any> {
      let deleteProfileResult = await ProfileRepo.findByIdAndRemove(profileId);
      if(deleteProfileResult.errors){
          throw new Unprocessable_422(`The DataBase is unable to process Profile with id ${profileId} delete request`);
      }
      return deleteProfileResult;
  }
}

