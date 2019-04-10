import { Route, Get, Post, Delete, Response, Header, Body, Controller } from 'tsoa';
import { IUserLoginRequest } from '../request';
import { IUserResponse, ISuccessResponse }  from '../responses';
import { createJwtToken } from '../../business-layer/security/token-helpers';
import { UserDataAgent } from '../../data-layer/data-agents/UserDataAgent';
import { UserModel } from '../../data-layer/models/UserModel';
import { logger } from '../../middleware/common/logging';


@Route('Authorizations')
export class AuthorizationsController extends Controller {

  userDataAgent = new UserDataAgent();

  @Post('Login')
  public async login(@Body() request: IUserLoginRequest): Promise<IUserResponse> {

      let result = await this.userDataAgent.getAuthorizedUser(request);
      if(result.id){
               var authedUser = new UserModel(result);
               let loginResult = Object.assign({account:{ user:authedUser.getClientUserModel(),  token:createJwtToken( result.id) } });
               var aUser = <IUserResponse>(loginResult);
               return aUser;
       }else{
          throw result;
       }
  }

  @Post('Logout')
  public async logout( @Header('x-access-token') authentication: string ): Promise<ISuccessResponse> {
         //  TODO: set up validation with redis and tracking of token... especially when email validation is available.
         let logoutResult = Object.assign({general:{ message:'user logged out', success:true } });
         return <ISuccessResponse>(logoutResult);
  }

}
