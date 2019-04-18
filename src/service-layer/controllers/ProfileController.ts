import { Route, Response, Get, Post, Put, Header, Body, Security, Controller, Path, Delete } from 'tsoa';
import { validate} from "class-validator";

import { IProfileAddBookRequest, IProfileCreateRequest, IProfileUpdateRequest } from '../request/index';
import { IProfileResponse, IErrorResponse, IProfileAddBookResponse } from '../responses/index';
import { createJwtToken } from '../../business-layer/security/token-helpers';
import { ProfileModel } from '../../data-layer/models/ProfileModel';
import { DataAgentServices as dataAgent } from '../../data-layer/data-agents';
import { BookingServices } from '../aggregates/bookingServices';
import { logger } from '../../middleware/common/logging';



@Route('Profiles')
export class ProfilesController extends Controller{

    @Security('api_key')
    @Post()
    public async createNewProfile(
      @Body()  request: IProfileCreateRequest): Promise<IProfileResponse> {
       let userExist = await dataAgent.userDA.getUserById(request.user);
       if( userExist  &&   userExist.userName){
             let newProfileAttempt = await dataAgent.
                profileDA.createNewProfile(request);
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
    public async GetProfileById(
      profileId: string, @Header('x-access-token')
      authentication: string ): Promise<IProfileResponse> {
       let profileResultById = await dataAgent.
          profileDA.getProfileById(profileId);
       if( profileResultById && profileResultById.user){
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
    @Post()
    public async AddBookRequest(
      @Body() request:IProfileAddBookRequest,
      @Header('x-access-token')
      authentication: string ): Promise<IProfileAddBookResponse> {
       const addRequestResult = await BookingServices.bookCheckOutService(request);
       if(addRequestResult && !addRequestResult.error){
          if(addRequestResult.hasOwnProperty('bookTitle')){
             return <IProfileAddBookResponse>({
               ...addRequestResult, isWaitListOption:true,
             })
           }else{
             return <IProfileAddBookResponse>({
               profile:addRequestResult, isWaitListOption:false,
             })
           }
       }else{
           throw addRequestResult;
       }
    }

    @Security('api_key')
    @Put()
    public async UpdateProfile(
      @Body() request: IProfileUpdateRequest ): Promise<IProfileResponse> {
        let profileUpdateResult = await dataAgent.profileDA.updateProfile(request);
        if(profileUpdateResult.id){
               const aProfile = new ProfileModel(profileUpdateResult);
               return <IProfileResponse>(aProfile);
        }else{
          throw profileUpdateResult
        }
    }

}