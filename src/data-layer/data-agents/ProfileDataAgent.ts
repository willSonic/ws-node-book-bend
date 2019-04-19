import mongoose = require('mongoose');
import {
 ProfileRepo,
 IProfileDocument
 } from '../data-abstracts/repositories/profile';
import { logger } from '../../middleware/common/logging';


export class ProfileDataAgent{

  async createNewProfile(profile:any):Promise<any> {
      let newProfile = <IProfileDocument>(profile);
      let previousProfile =  await ProfileRepo.findOne({ user : newProfile.user});
      if(previousProfile){
         return  {thrown:true, success:false, status:409,  message: "Profile has already been added"};
      }
      let newProfileResult =  await ProfileRepo.create(newProfile);
      if(newProfileResult.errors){
          return  {
            thrown:true,
            success:false,
            status:422,
            message: "db is currently unable to insert new Profile request"};
      }
      return newProfileResult;
  }
  async getProfileById(profileId:string):Promise<any> {

      console.log('   --- getProfileById   profileId=',profileId)
      let profile =  await ProfileRepo.find({ id : profileId})
        .populate('user')
        .populate('messages')
        .populate('comments')
        .populate('booksOut')
        .populate('inventories');
      console.log('   --- getProfileById   profile=',profile)
      if(!profile){
            return  {thrown:true, status:404,  message: "Profile for this User does not exit"};
      }
      return profile;
  }
  async getProfileByUserId(userId:string):Promise<any> {
      let profile =  await ProfileRepo.find({ user : userId})
        .populate('user')
        .populate('messages')
        .populate('comments')
        .populate('bookedOut')
        .populate({ path:'inventories.waitList', match:{userId: {   $eq: userId} }});
      if(!profile){
            return  {thrown:true, status:404,  message: "Profile for this User does not exit"};
      }
      return profile;
  }

  async updateProfile(profile:any):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(profile.id)){
            return  {thrown:true, status:401,  message: "incorrect profiled id"};
      }
      let resultProfileById = await ProfileRepo.findById(profile.id);
      if(!resultProfileById){
         return  {thrown:true, status:409,  message: "this user Profile does not exist"};
      }
      Object.keys( resultProfileById).forEach(item =>{
              if(profile[item] && profile[item] !== undefined){
                  resultProfileById[item] = profile[item];
              }
        });
      let savedResult = await resultProfileById.save();
      if(savedResult.errors){
          return  {status:422,  message: "db is currently unable to process request"};
      }

      return savedResult;
  }
  async deleteExistingProfile(profileId:string):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(profileId)){
            return  {
               thrown:true,
               status:401,
               message: "incorrect profile id"
             };
      }
      let deleteProfileResult = await ProfileRepo.findByIdAndRemove(profileId);
      if(deleteProfileResult.errors){
          return  {
           thrown:true,
           success:false,
           status:422,
            message: "db is currently unable to process Profile delete request"};
      }
      return deleteProfileResult;
  }
}

