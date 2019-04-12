import { Route, Response, Get, Post, Patch, Header, Body, Security, Controller, Path, Delete } from 'tsoa';
import { validate} from "class-validator";

import { IProfileCreateRequest, IProfileUpdateRequest} from '../request/index';
import { IProfileResponse, IErrorResponse} from '../responses/index';
import { createJwtToken } from '../../business-layer/security/token-helpers';

import { ProfileDataAgent } from '../../data-layer/data-agents/ProfileDataAgent';
import { UserDataAgent } from '../../data-layer/data-agents/UserDataAgent';
import { ProfileModel } from '../../data-layer/models/ProfileModel';

import { logger } from '../../middleware/common/logging';


@Route('Profiles')
export class ProfilesController extends Controller{

    profileDataAgent:ProfileDataAgent = new ProfileDataAgent();
    userDataAgent:UserDataAgent = new UserDataAgent();

    @Security('api_key')
    @Post()
    public async createNewProfile(@Body()  request: IProfileCreateRequest): Promise<IProfileResponse> {
       let userExist = await this.userDataAgent.getUserById(request.userRef);
       if( userExist  &&   userExist.userName){
             let newProfileAttempt = await this.profileDataAgent.createNewProfile(request);
             if(newProfileAttempt.id){
                 const newProfile = new ProfileModel(newProfileAttempt);
                 return <IProfileResponse>(newProfile);
             }else{
                throw newProfileAttempt;
             }
       }else{
          if(userExist){
              throw userExist;
          }else{
              throw{
                   thrown:true,
                   status: 404,
                   message: 'no such user exist and profile cannot be constructed'
              }
          }
       }

    }


    @Security('api_key')
    @Get('{profileId}')
    public async GetProfileById(profileId: string, @Header('x-access-token') authentication: string ): Promise<IProfileResponse> {
       let profileResultById = await this.profileDataAgent.getProfileById(profileId);
       if( profileResultById && profileResultById.userRef){
              const aProfile = new ProfileModel(profileResultById);
              return <IProfileResponse>(aProfile);
       }else{
          if(profileResultById){
              throw profileResultById;
          }else{
              throw{
                   thrown:true,
                   status: 404,
                   message: 'no such Profile  exist'
              }
          }
       }
    }



    @Security('api_key')
    @Patch()
    public async UpdateProfile(@Body() request: IProfileUpdateRequest ): Promise<IProfileResponse> {
        let profileUpdateResult = await this.profileDataAgent.updateProfile(request);
        if(profileUpdateResult.id){
               const aProfile = new ProfileModel(profileUpdateResult);
               return <IProfileResponse>(aProfile);
        }else{
          throw profileUpdateResult
        }
    }

}
