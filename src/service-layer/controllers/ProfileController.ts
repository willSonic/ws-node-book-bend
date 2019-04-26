import { Route, Response, Get, Post, Put, Header, Body, Security, Controller, Path, Delete } from 'tsoa';
import { validate} from "class-validator";

import { IProfileAddBookRequest, IProfileCreateRequest, IProfileUpdateRequest } from '../request/index';
import { IProfileResponse, IErrorResponse, IProfileAddBookResponse } from '../responses/index';
import { createJwtToken, addTemporaryToken } from '../../business-layer/security/token-helpers';
import { CookieSerializeOptions, serialize, parse  } from 'cookie';
import { ProfileModel } from '../../data-layer/models/ProfileModel';
import { DataAgentServices as dataAgent } from '../../data-layer/data-agents';
import { BookingServices } from '../aggregates/bookingServices';
import { logger } from '../../middleware/common/logging';
import * as config from '../../business-layer/security/token-helpers';



@Route('Profiles')
export class ProfilesController extends Controller{
    private cookies = {};

    @Security('api_key')
    @Post()
    public async createNewProfile(
      @Body()  request: IProfileCreateRequest,
      @Header('x-access-token')  authentication: string ): Promise<IProfileResponse> {
       let userExist = await dataAgent.userDA.getUserById(request.user);
       if( userExist  &&   userExist.userName){
             console.log( 'createNewProfile  userExist  = ', userExist);
             let newProfileAttempt = await dataAgent.
                profileDA.createNewProfile(request.user);
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
      console.log( 'GetProfileById  profileId  = ', profileId);
       let profileResultById = await dataAgent.
          profileDA.getProfileById(profileId);
      console.log( 'GetProfileById  profileResultById  = ', profileResultById)
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
    @Post("/addBook")
    public async AddBookRequest(
      @Body() request:IProfileAddBookRequest,
      @Header('x-access-token')
      authentication: string ): Promise<IProfileAddBookResponse> {
      const addRequestResult = await BookingServices.bookCheckOutService(request);
      if(addRequestResult && !addRequestResult.error){
          if(addRequestResult.hasOwnProperty('waitTime')){
             // set up session
             const tempCookie =  await addTemporaryToken(
                 addRequestResult.userId,
                 addRequestResult.inventoriedId
             );

             this.setHeader("Set-Cookie", tempCookie);
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
    @Post("/addToWaitList")
    public async AddUserToWaitlist(
      @Body() request:IProfileAddBookRequest,
      @Header('x-access-token')
      authentication: string ): Promise<IProfileAddBookResponse> {
      const addRequestResult = await BookingServices.bookCheckOutService(request);
      if(addRequestResult && !addRequestResult.error){
          if(addRequestResult.hasOwnProperty('waitTime')){
             // set up session
             const tempCookie =  await addTemporaryToken(
                 addRequestResult.userId,
                 addRequestResult.inventoriedId
             );
             this.getHeader
             this.setHeader("Set-Cookie", tempCookie);
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
      @Body() request: IProfileUpdateRequest,
      @Header('x-access-token') authentication: string
       ): Promise<IProfileResponse> {
        let profileUpdateResult = await dataAgent.profileDA.updateProfile(request);
        if(profileUpdateResult.id){
               const aProfile = new ProfileModel(profileUpdateResult);
               return <IProfileResponse>(aProfile);
        }else{
          throw profileUpdateResult
        }
    }

}
