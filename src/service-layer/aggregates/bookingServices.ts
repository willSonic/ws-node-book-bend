import { IProfileResponse } from '../responses';
import { borrowerRules } from '../../business-layer/utils/bizRules';
import { DataAgentServices as dataAgent } from '../../data-layer/data-agents';
import { ProfileModel } from '../../data-layer/models';


export class BookingServices{

   async bookCheckOutService( checkoutRequest:any):Promise<any>{
       //1 --  profile = get User Profile
      let profileResult = await dataAgent
         .profileDA
         .getProfileByUserId(checkoutRequest.userId);
      let aProfile = new ProfileModel(profileResult);

       //2
       // -- if checkout count greater than max return
      if(aProfile.checkedOutCount === borrowerRules.maxCheckout ){
          throw {
                   thrown:true,
                   status: 404,
                   message: 'User has checked out their maximum number of books allowed'
              }
      }
       // -- if user currently has this booked checked out
      if(aProfile.booksOut.some( booked =>
               booked.book.googleId === checkoutRequest.bookId &&
               booked.active  ) ){
          throw {
                   thrown:true,
                   status: 404,
                   message: 'User has currently checked this book out'
              }
       }

       // -- if user currently on the wait list for this book
      if(aProfile.inventories.some( inventory =>
                inventory.bookIdRef === checkoutRequest.bookId ) ){
          throw {
                   thrown:true,
                   status: 404,
                   message: 'User is currently on the wait-list for this book'
              }
       }

       const book = await dataAgent.
        bookDA.
        createOrFindBook(checkoutRequest.bookId)


       //3 -- get book by id == google id
       // - inventoryDA.getInventoryByGoogleId()
       const inventory = await dataAgent.
        inventoryDA.
        getInventoryByGoogleId(checkoutRequest.bookId)
        //if inventory exist and it is available
        // -add user to
        //
        //
       //4 -- inventory == inventoryDataAgent createOrFindInventory(BookRef)
        // -- if  available status  is False get
        //       get bookedDataAgent with  inventory,crntBookedRef
        //       Approximate wait time calculate Date.now() -  booked.returnDate
        //       + ( waitList count * current time allotted for checkout
        //       -- return Available wait time / ( controller creates temp cookie)
       //5 -- booked =bookedDataAgent.createOrFind( ( book, and user) --re-hydrate)
       //     bookedExpireEventDataAgent.create()
       //6    updateInventory  inventory.crntBookedRef = book
       //6 -- message =  messageDataAgent.create(Add Message)
       //7 -- updateProfile   messageRefs ( message.ref)
       // --                  bookedRefs ( booked.ref)
       // --                  checkedOutCount ( increase by 1);
       // --                  interestCategories ( book.categories)
       // 8--  PROFILE RESPONSE


   }

   async  addUserToBookWaitList(waitListRequest:any):Promise<any>{
         //  waitListRequest {
          //  userRef
          //  bookRef
          //  inventoryRef
          //}
          // 1-- Profile = getProfile by UserREf
          // -- check waitListCount to ensure user has not added between wait
          //  -- if count surpasses limit retur
          // 2-- Book  = bookRef.getBookById( bookRef)
         // 3 -- inventory  = getInventoryByBookRef()
         //   - update  [ inventoryRef.waitlist.. { userRef, new data}
        //    3.a--  inventory =   getInventoryAndUpdate(
        //    - identifierObj = { bookRef} . inventoryObj update
        // 4-- message   =  messageDataAgent.create(Add Message)
       //  5-- updateProfile   messageRefs ( message.ref)
       // --                  waitListCount ( inventory.ref)
       // --                  checkedOutCount ( increase by 1);
       // --                  interestCategories ( book.categories)
       // -- return udpated ProfileResponse
   }
}


