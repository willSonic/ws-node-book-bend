import mongoose = require('mongoose');
import {
  MessageRepo,
  IMessageDocument
} from '../data-abstracts/repositories/message';
import { logger } from '../../middleware/common/logging';
import { IUserDocument } from '../data-abstracts/repositories/user';
import { BookRepo } from '../data-abstracts/repositories/book';


export class MessageDataAgent {

  async createNewMessage(message:any):Promise<any> {
     let newMessage = <IMessageDocument>(message);
     let newMessageResult =  await MessageRepo.create(newMessage);
      if(newMessageResult.errors){
          return  {
            thrown:true,
            success:false,
            status:422,
            message: "db is currently unable to process new Message create request"
          };
      }
      return newMessageResult;
  }

  async getMessagesByUserRef(userRef:string):Promise<any> {
      let messages =  await MessageRepo.find({ userRef : userRef});
      if(!messages){
            return  {
              thrown:true,
              status:404,
              message: "this user does not have any messages"};
      }
      return messages;
  }

  async deleteExistingMessage(messageId:string):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(messageId)){
            return  {
              thrown:true,
              status:401,
              message: "incorrect message id"};
      }
      let deleteMessageResult = await MessageRepo.findByIdAndRemove(messageId);
      if(deleteMessageResult.errors){
          return  {
            status:422,
            message: "db is currently unable to process message delete request"};
      }
      return deleteMessageResult;
  }
}


