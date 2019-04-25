import * as config from 'config';
import * as express from 'express';
import { UserModel } from '../../data-layer/models/UserModel';
import { RedisAccess } from '../../data-layer/adapters/RedisAccess';
import * as jwt from 'jsonwebtoken';
import { logger } from '../../middleware/common/logging';
import { serialize } from 'cookie';


const opts = {
  secretOrKey: config.get('auth.jwt_secret').toString(),
  tempSecretOrKey: config.get('auth.jwt_short_time_secret').toString(),
};


function createJwtToken(userId:string, secret:string =opts.secretOrKey, expireTime:number =(8*60*60) ): string {
     var user = Object.assign({userId:userId});
     let token = jwt.sign(user, secret, {expiresIn: expireTime});
     return token;
}


function verifyToken(token:any, secret:string = opts.secretOrKey):any{
    try {
      return  jwt.verify(token, secret);
    } catch(err) {
       console.log('token-helper.ts -- verifyToken = err ', err)
       return new Error('Unable to access data as user cannot be verified ');
     }
}

async function verifyTwoMinToken( userId:string, token:any): Promise<Boolean>  {
     const userTmpId = userId +'_2min';
    if(verifyToken(token,opts.tempSecretOrKey)){
       const result  = await RedisAccess.redisClient.hmget(userTmpId);
       if(result.userId === userTmpId){
        return Boolean(true)
       }else{
        return Boolean(false)
       }
    }else{
        return Boolean(false)
    }

}



async function  addTemporaryToken( userId:string, inventoryId:string): Promise<any>  {
     const userTmpId = userId +'_2min';
     const expireTime = Number(config.get('waitlist_opp.TTE'));
     const twoMinToken = createJwtToken(userTmpId, opts.tempSecretOrKey, expireTime);
     const hashData = {token: twoMinToken, userId:userTmpId, inventoryId:inventoryId};
     const isOK = await RedisAccess.redisClient.hmset( userTmpId, hashData);
     const didSetExp = await RedisAccess.redisClient.expire( userTmpId, expireTime);
     if(isOK.toString() === 'OK' && didSetExp===1){
          return serialize('wl2min',
                      String(twoMinToken), {
                            path: '/',
                            httpOnly: true,
                            maxAge: expireTime
                      });
      }else{
         return {
            thrown:true,
            success:false,
            status:500,
            message: "unable to process request for waitlist token"
            };
      }
}


async function deleteTemporaryToken( userId:string){
     const userTmpId = userId +'_2min';
     let deleteCount = await RedisAccess.redisClient.del(userTmpId);
}


export {createJwtToken, verifyToken, addTemporaryToken, verifyTwoMinToken}
