import * as config from 'config';
import * as express from 'express';
import { UserModel } from '../../data-layer/models/UserModel';
import { RedisAccess } from '../../data-layer/adapters/RedisAccess';
import * as jwt from 'jsonwebtoken';
import { logger } from '../../middleware/common/logging';


const opts = {
  secretOrKey: config.get('auth.jwt_secret').toString(),
  tempSecretOrKey: config.get('auth.jwt_short_time_secret').toString(),
};


function createJwtToken(userId:string, secret:string =opts.secretOrKey, expireTime:number =(60*60) ): string {
     var user = Object.assign({userId:userId});
     let token = jwt.sign(user, secret, {expiresIn: expireTime});
     return token;
}


function verifyToken(token:any, secret:string = opts.secretOrKey):any{
    try {
      return  jwt.verify(token, secret);
    } catch(err) {
       return new Error('Unable to access data as user cannot be verified ');
     }
}

async function verifyTwoMinToken( userId:string, token:any): Promise<Boolean>  {
    if(verifyToken(token,opts.tempSecretOrKey)){
       const result  = await RedisAccess.redisInstance.get(token);
       if(result === userId){
        return Boolean(true)
       }else{
        return Boolean(false)
       }
    }else{
        return Boolean(false)
    }

}



async function  addTemporaryToken( userId:string): Promise<any>  {
     let twoMinToken = createJwtToken(userId, opts.tempSecretOrKey, (60*2) );
     let isOK = await RedisAccess.redisInstance.set( twoMinToken, userId, 'ex', 175 );
     return {
         success:isOK ==="OK",
         token:twoMinToken
      }
}


async function deleteTemporaryToken( token:any){
     let deleteCount = await RedisAccess.redisInstance.del(token);
}


export {createJwtToken, verifyToken, addTemporaryToken}
