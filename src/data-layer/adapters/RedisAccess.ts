import  * as IORedis  from "ioredis";
import * as config from 'config';
import { logger } from '../../middleware/common/logging';
import { Redis } from 'ioredis';

class RedisAccess {
      static redisInstance:any;
      static redisClient:IORedis.Redis;
      static isRedisConnected:boolean = false;
      static tryReconnecting:number = 0;
      static maxReconnectingTry:number = 4;
       constructor(){
          RedisAccess.connect();
       }

       static  connect( )  : void {
            if (this.redisInstance) {
               return this.redisInstance;
            }

            let redisOptions = config.get('redis');

            //
            // this.redisClient.once('ready', () => {
            //    logger.info('Client connect to an redis is opened.');
            //  });


            this.redisClient =   new  IORedis(config.get('redis.port'),
                      config.get('redis.urlDocker').toString() );

            this.redisInstance = this.redisClient;

            this.redisClient.on('connect',()=>{
                logger.debug('subs connected to redis');
                this.isRedisConnected = true;
            });

            this.redisClient.on("error",  (err)=>{
                logger.debug("Error occurred while connecting to redis " + err);
                this.isRedisConnected = false;
            });

            // When the connection is disconnected
            this.redisClient.on('reconnecting', (err) => {
                this.tryReconnecting++;
                logger.warn('reconnecting');
                 if(this.tryReconnecting >= this.maxReconnectingTry){
                     logger.error(err);
                     this.redisClient.quit();
                 }
            });


           // If the Node process ends, close the Mongoose connection
            process.on('SIGINT', () => {
              this.redisClient.quit(() => {
                 this.redisClient.removeAllListeners('ready');
                 this.redisClient.removeAllListeners('connect');
                 this.redisClient.removeAllListeners('error');
                 this.redisClient.removeAllListeners('reconnecting');
                logger.info('Redis default connection disconnected through app termination.');
                process.exit(0);
              });
            });

        return  this.redisInstance;
     }
}

const redisAccess = new RedisAccess();
export { RedisAccess }
