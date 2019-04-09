import { RedisClient, createClient  } from 'redis';
import {  ICreateHandyClient } from 'handy-redis'
import { createHandyClient } from 'handy-redis';
import * as config from 'config';
import { logger } from '../../middleware/common/logging';



class RedisAccess {
      static redisInstance:any;
      static redisClient:RedisClient;

      constructor() {
          RedisAccess.connect();
        }
      static connect()  : RedisClient {
            if (this.redisInstance) {
               return this.redisInstance;
            }

            let redisOptions = config.get('redis...');

            this.redisClient.once('ready', () => {
               logger.info('Client connect to an redis is opened.');
             });


             this.redisInstance = this.redisClient = createClient(redisOptions );


        // When the connection is disconnected
           this.redisClient.on('reconnecting', (connection) => {
            setTimeout(function() {
              this.mongooseredisInstanceInstance = Mongoose.connect(connectionString);
            }, 10000);
            logger.info('Mongoose default connection disconnected.');
          });

















        return this.redisInstance;
     }

}

RedisAccess.connect();

export { RedisAccess }
