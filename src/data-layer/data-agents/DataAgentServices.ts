import { BookDataAgent }from './BookDataAgent';
import { BookedDataAgent }from './BookedDataAgent';
import { BookedExpireEventDataAgent }from './BookedExpireEventDataAgent';
import { CommentDataAgent }from './CommentDataAgent';
import { InventoryDataAgent }from './InventoryDataAgent';
import { MessageDataAgent }from './MessageDataAgent';
import { ProfileDataAgent }from './ProfileDataAgent';
import { UserDataAgent }from './UserDataAgent';


class DataAgents {
      private _bookDataAgent:BookDataAgent;
      private _bookedDataAgent:BookedDataAgent;
      private _bookedExpireEventDataAgent:BookedExpireEventDataAgent;
      private _commentDataAgent:CommentDataAgent;
      private _inventoryDataAgent:InventoryDataAgent;
      private _messageDataAgent:MessageDataAgent;
      private _profileDataAgent:ProfileDataAgent;
      private _userDataAgent:UserDataAgent;

      get bookDA(): BookDataAgent {
        if(!this._bookDataAgent){
           this._bookDataAgent = new BookDataAgent();
        }
        return this._bookDataAgent;
      }

      get bookedDA(): BookedDataAgent {
        if(!this._bookedDataAgent){
           this._bookedDataAgent = new BookedDataAgent();
        }
        return this._bookedDataAgent;
      }

      get bookedExpireEventDA(): BookedExpireEventDataAgent {
        if(!this._bookedExpireEventDataAgent){
           this._bookedExpireEventDataAgent = new BookedExpireEventDataAgent();
        }
        return this._bookedExpireEventDataAgent;
      }

      get commentDA(): CommentDataAgent {
        if(!this._commentDataAgent){
           this._commentDataAgent = new CommentDataAgent();
        }
        return this._commentDataAgent;
      }

      get inventoryDA(): InventoryDataAgent {
        if(!this._inventoryDataAgent){
           this._inventoryDataAgent = new InventoryDataAgent();
        }
        return this._inventoryDataAgent;
      }

      get messageDA(): MessageDataAgent {
        if(!this._messageDataAgent){
           this._messageDataAgent = new MessageDataAgent();
        }
        return this._messageDataAgent;
      }

      get profileDA(): ProfileDataAgent {
        if(!this._profileDataAgent){
           this._profileDataAgent = new ProfileDataAgent();
        }
        return this._profileDataAgent;
      }

      get userDA(): UserDataAgent {
        if(!this._userDataAgent){
           this._userDataAgent = new UserDataAgent();
        }
        return this._userDataAgent;
      }
}

const DataAgentServices = new DataAgents();

export { DataAgentServices }
