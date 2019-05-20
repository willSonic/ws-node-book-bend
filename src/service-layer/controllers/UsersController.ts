import { Route, Response, Get, Post, Patch, Header, Body, Security, Controller, Path, Delete } from 'tsoa';
import { validate} from "class-validator";
import { IUserCreateRequest, IUserUpdateRequest} from '../request/index';
import { IUserResponse, IErrorResponse} from '../responses/index';
import { validateUserRegistration }   from "../../business-layer/validators/user/UserValidationProcessor";
import { createJwtToken } from '../../business-layer/security/token-helpers';
import { UserModel } from '../../data-layer/models/UserModel';

import { DataAgentServices as dataAgent } from '../../data-layer/data-agents/DataAgentServices';
import { logger } from '../../middleware/common/logging';
import { Authentication_401 } from '../../business-layer/utils/errors/ApplicationError';


@Route('Users')
export class UsersController extends Controller{

    @Post()
    public async RegisterNewUser(@Body()  request: IUserCreateRequest): Promise<IUserResponse> {
       let validationErrors:any[] = await validateUserRegistration(request);
       if(validationErrors.length>0){
          throw new Authentication_401( `New User registration errors validationErrors ${validationErrors.toString()}`);
       }
       let newUserAttempt = await dataAgent.userDA.createNewUser(request);
       const newUser = new UserModel(newUserAttempt);
       const loginResult = Object.assign(
           {account:{
                    user:newUser.getClientUserModel(),
                     token:createJwtToken( newUserAttempt.id)
                     }
              });
       return <IUserResponse>(loginResult);
    }


    @Security('api_key')
    @Get('{userId}')
    public async GetUserById(userId: string, @Header('x-access-token') authentication: string ): Promise<IUserResponse> {
       let result = await dataAgent.userDA.getUserById(userId);
       const aUser = new UserModel(result);
       return <IUserResponse>(aUser.getClientUserModel());
    }


    @Response<IErrorResponse>('404','no such user exist' )
    @Get('userName/{userName}')
    public async GetUserByUsername( @Path() userName: string): Promise<IUserResponse> {
        let result = await dataAgent.userDA.getByUsername(userName);
        const aUser = new UserModel(result);
        return <IUserResponse>( {user:aUser.getClientUserModel()});
    }


    @Patch()
    public async UpdateUser(@Body() request: IUserUpdateRequest ): Promise<IUserResponse> {
        let result = await dataAgent.userDA.updateUser(request);
        const aUser = new UserModel(result);
        return <IUserResponse>(aUser.getClientUserModel());

    }

}
