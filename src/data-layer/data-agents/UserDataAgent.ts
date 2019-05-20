import { UserRepo, UserSchema, IUserDocument} from '../data-abstracts/repositories/user';
import { logger } from '../../middleware/common/logging';
import { Conflict_409, NotFound_404, Unprocessable_422, Invalid_400 } from '../../business-layer/utils/errors/ApplicationError';


export class UserDataAgent{

  async createNewUser(user:any):Promise<any> {
      let newUser = <IUserDocument>(user);
      let previousUser =  await UserRepo.findOne({ userName : newUser.userName});
      if(previousUser){
         throw new Conflict_409(`A User with a userName of ${ newUser.userName} was previously created!`)
      }
      newUser.isLoggedIn = true;
      let newUserResult =  await UserRepo.create(newUser);
      if(newUserResult.errors){
          throw new Unprocessable_422("The DataBase is currently unable to create new User request");
      }
      return newUserResult;
  }


  async getAuthorizedUser(auth:any):Promise<any> {
      let authorizedUserResult = await UserRepo.findOne({ userName:auth.userName});
      if(!authorizedUserResult){
         throw  new  NotFound_404(`There is no User present with a userName: ${ auth.userName }!`);
      }
      let passwordsMatch =   await UserSchema.methods.comparePassword( auth.password, authorizedUserResult);
      if(!passwordsMatch){
            throw new Invalid_400(`The userName or password is incorrect!`);

      }
      var userProfile = <IUserDocument>authorizedUserResult;
      userProfile.isLoggedIn = true;
      let savedResult = await userProfile.save();
      if(savedResult.errors){
          throw new Unprocessable_422("The DataBase is currently unable successfully update a user as Logged In!");
      }
      return authorizedUserResult;
  }


  async getByUsername(userName:string):Promise<any> {
      let userResultByBame =  await UserRepo.findOne({ userName : userName});
      if(!userResultByBame){
          throw new NotFound_404(`A User with a userName of ${userName} does not exist`);
      }
      return userResultByBame;
  }

  async getUserById( userId:string):Promise<any>{
      let userResultById = await UserRepo.findById(userId);
      if(!userResultById){
          throw new NotFound_404(`A User  with an id of ${userId} does not exist`);
      }
      return userResultById;
  }



  async updateUser(user:any):Promise<any> {
      let resultUserById = await UserRepo.findById(user.id);
      if(resultUserById){
         throw  new  Conflict_409( `A User with id ${user.id} entity does not exist!`);
      }
      let savedResult = await resultUserById.save();
      if(savedResult.errors){
          throw new Unprocessable_422("The DataBase currently unable to process User update request");
      }

      return savedResult;

  }

  async destroyUser(userId:string) {
      let deleteUserResult = await UserRepo.findByIdAndRemove(userId);
      if(deleteUserResult.errors){
          throw new Unprocessable_422(`The DataBase is unable to process delete request User with an id ${userId}`);
      }
      return deleteUserResult;
  }

}

export class AuthServiceCheck {

   userDataAgent =  new UserDataAgent();

   async getAuthById(userId:string):Promise<any>{
     return await this.userDataAgent.getUserById(userId);
  }
}

