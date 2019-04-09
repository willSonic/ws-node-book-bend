import { RedisClient, createClient  } from 'redis';
import * as config from 'config';
import { logger } from '../../middleware/common/logging';



class RedisAccess {
      static redisInstance:any;
      static redisClient:RedisClient;
      static isRedisConnected:boolean = false;
      static tryReconnecting:number = 0;
      static maxReconnectingTry:number = 4;

      constructor() {
          RedisAccess.connect();
        }
      static async connect()  : RedisClient {
            if (this.redisInstance) {
               return this.redisInstance;
            }

            let redisOptions = config.get('redis...');


            this.redisClient.once('ready', () => {
               logger.info('Client connect to an redis is opened.');
             });


            this.redisInstance =   await this.redisClient.createClient(redisOptions );

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
              logger.info('Redis default connection disconnected through app termination.');
                process.exit(0);
              });
            });





        return  this.redisInstance;
     }

}

RedisAccess.connect();

export { RedisAccess }
