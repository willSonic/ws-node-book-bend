import {
  MessageRepo,
  IMessageDocument
} from '../data-abstracts/repositories/message';
import { logger } from '../../middleware/common/logging';
import { IUserDocument } from '../data-abstracts/repositories/user';
import { BookRepo } from '../data-abstracts/repositories/book';
import { NotFound_404, Unprocessable_422 } from '../../business-layer/utils/errors/ApplicationError';


export class MessageDataAgent {

  async createNewMessage(message:any):Promise<any> {
     let newMessage = <IMessageDocument>(message);
     let newMessageResult =  await MessageRepo.create(newMessage);
      if(newMessageResult.errors){
          throw new Unprocessable_422("The DataBase currently unable to process new Message create request");
      }
      return newMessageResult;
  }

  async getMessagesByUserRef(userRef:string):Promise<any> {
      let messages =  await MessageRepo.find({ userRef : userRef});
      if(!messages){
          throw new NotFound_404(`A User with an id of ${userRef} does have any messages!`);
      }
      return messages;
  }

  async deleteExistingMessage(messageId:string):Promise<any> {
      let deleteMessageResult = await MessageRepo.findByIdAndRemove(messageId);
      if(deleteMessageResult.errors){
          throw new Unprocessable_422(`The DataBase is unable to process Message with id ${messageId} delete request`);
      }
      return deleteMessageResult;
  }
}


