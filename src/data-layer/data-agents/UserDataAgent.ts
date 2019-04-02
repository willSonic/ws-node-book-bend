import mongoose = require('mongoose');
import { UserRepo, UserSchema, IUserDocument} from '../data-abstracts/repositories/user';
import { logger } from '../../middleware/common/logging';


export class UserDataAgent{

  async createNewUser(user:any):Promise<any> {
      let newUser = <IUserDocument>(user);
      let previousUser =  await UserRepo.findOne({ userName : newUser.userName});
      if(previousUser){
         return  {thrown:true, success:false, status:409,  message: "userName is already in use"};
      }
      newUser.isLoggedIn = true;
      let newUserResult =  await UserRepo.create(newUser);
      if(newUserResult.errors){
          return  {thrown:true, success:false,  status:422,  message: "db is currently unable to process request"};
      }
      return newUserResult;
  }


  async getAuthorizedUser(auth:any):Promise<any> {
      let authorizedUserResult = await UserRepo.findOne({ userName:auth.userName});
      if(!authorizedUserResult){
            return  {thrown:true, status:401,  message: "no userName "+auth.userName+" currently exist"};
      }
      let passwordsMatch =   await UserSchema.methods.comparePassword( auth.password, authorizedUserResult);
      if(!passwordsMatch){
            return  {thrown:true, status:401,  message: "userName or password is incorrect"};

      }
      var userProfile = <IUserDocument>authorizedUserResult;
      userProfile.isLoggedIn = true;
      let savedResult = await userProfile.save();
      if(savedResult.errors){
          return  {thrown:true, status:422,  message: "db is currently unable to process request"};
      }
      return authorizedUserResult;
  }


  async getByUsername(userName:string):Promise<any> {
      let authUser =  await UserRepo.findOne({ userName : userName});
      if(!authUser){
            return  {thrown:true, status:404,  message: "userName does not exit"};
      }
      return authUser;
  }

  async getUserById( userId:string):Promise<any>{
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(userId)){
            return  {status:401,  message: "incorrect user id"};
      }
      let result = await UserRepo.findById(userId);
      return result;
  }



  async updateUserProfile(userProfile:any):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(userProfile.id)){
            return  {thrown:true, status:401,  message: "incorrect user id"};
      }
      let resultUserById = await UserRepo.findById(userProfile.id);
      if(resultUserById){
         return  {thrown:true, status:409,  message: "this user does not exist"};
      }
      let savedResult = await userProfile.save();
      if(savedResult.errors){
          return  {status:422,  message: "db is currently unable to process request"};
      }

      return savedResult;

  }

  async destroy() {
    throw new Error('todo!');
  }

}

export class AuthServiceCheck {

   userDataAgent =  new UserDataAgent();

   async getAuthById(userId:string):Promise<any>{
     return await this.userDataAgent.getUserById(userId);
  }
}

