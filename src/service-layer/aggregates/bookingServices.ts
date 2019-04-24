import { IProfileResponse } from '../responses';
import { borrowerRules,getExpireTime, messageTypes, createMessageText } from '../../business-layer/utils/bizRules';
import { DataAgentServices as dataAgent } from '../../data-layer/data-agents';
import { ProfileModel } from '../../data-layer/models';
import { IBookDocument } from '../../data-layer/data-abstracts/repositories/book';
import { IProfileDocument } from '../../data-layer/data-abstracts/repositories/profile';
import { IBookedDocument, IBookedExpireEventDocument } from '../../data-layer/data-abstracts/repositories/booked';
import { IInventoryDocument } from '../../data-layer/data-abstracts/repositories/inventory';

async function updateUserProfile(
      book:IBookDocument,
      profileResult:IProfileDocument,
      newBooked:IBookedDocument,
      waitList:boolean = false ):Promise<any>{

      const newMessageText = !waitList?
          createMessageText(messageTypes.BOOK_CHECKED_OUT,
            {
                       bookTitle:book.title,
                       checkOutDate: newBooked.createdAt,
                       checkInDate: newBooked.returnDate,
                    }):
          createMessageText(messageTypes.BOOK_USER_WAIT_LISTED,
            {
                       bookTitle:book.title,
                    });


      const newMessage = await dataAgent.messageDA.createNewMessage({
        user: profileResult.user.id,
        messageType: !waitList?
          messageTypes.BOOK_CHECKED_OUT:
          messageTypes.BOOK_USER_WAIT_LISTED,
        messageText: newMessageText
        });

      if(!waitList){
          profileResult.checkedOutCount += 1;
          profileResult.booksOut.push(newBooked.id);
          const newBookCategories = book.categories.filter(
            (interest) => profileResult.interestCategories.
                    indexOf(interest)<0);

          if(newBookCategories.length>0){
              profileResult.interestCategories =profileResult.interestCategories.
                    concat(newBookCategories);
          }
      }else{
          profileResult.waitListCount += 1;
      }

      profileResult.messages.push(newMessage.id);

      const updatedProfile = await dataAgent.profileDA.
            updateProfile(profileResult);

     return updatedProfile;
}


async function processCheckoutRequest(
      book:IBookDocument,
      profileResult:IProfileDocument,
      inventory:IInventoryDocument,
      waitList:boolean = false
   ):Promise<any>{
     const prevBooked = profileResult.booksOut.filter( (booked) =>
           booked.book.googleId === book.googleId);

     if(!waitList ){
         //create new Booked entity associating User and Book
         let bookedResult:IBookedDocument;
         let inventoryResult:IInventoryDocument;
         if( prevBooked.length>0 ){
            bookedResult = await dataAgent.bookedDA.updateBooked(
             {...prevBooked[0],active:true });
         }else{
            bookedResult =  await dataAgent.bookedDA.createNewBooked({
              book: (book.id).toString(),
              user: (profileResult.user.id).toString(),
              active: true
            });
         }

         //create book check expire record to get event...
         const  bookedToExpire:IBookedExpireEventDocument =  await dataAgent.
                bookedExpireEventDA.
                createBookedExpireEvent((bookedResult._id).toString());

         if(inventory.id){
            inventoryResult =  await dataAgent.inventoryDA.
                 updateInventory( {
                 id:inventory.id,
                 booked:(bookedResult._id).toString(),
                 available:false,
               });
         }else{
            inventoryResult = await dataAgent.
              inventoryDA.
              createNewInventory( {
                 bookGoogleId: (book.googleId).toString(),
                 booked:(bookedResult._id).toString(),
                 available:false,
               });
         }

         //Book can be checked
         return bookedResult;
     }else{

        inventory.waitList.push({
            userId: (profileResult.user.id).toString(),
            requestDate:new Date(),
        });
        const updateInventory =  await dataAgent.inventoryDA.
             updateInventory( inventory);

         //User's request for book is on the wait list.
         return updateInventory;
     }

}


class BookingService{
   async bookCheckOutService( checkoutRequest:any):Promise<any>{
       //1 --  profile = get User Profile
         console.log('processCheckoutRequest ---   checkoutRequest  =  ', checkoutRequest);
      let profileResult:IProfileDocument = await dataAgent
         .profileDA
         .getProfileByUserId(checkoutRequest.userId);

       //2
       // -- if checkout count greater than max return
      if(profileResult.checkedOutCount === borrowerRules.maxCheckout ){
         //TODO: should we create book and allow user to be place on waitlist
          throw {
                   thrown:true,
                   status: 404,
                   message: 'User has checked out their maximum number'+
                            ' of books allowed and can not be placed on'+
                            ' wait list for this book'
              }
      }
       // -- if user currently has this booked checked out

      if( profileResult.booksOut.some( (booked) =>
               booked.book.googleId === checkoutRequest.book.googleId &&
               booked.active  )){
            throw {
                   thrown:true,
                   status: 404,
                   message: 'User has currently checked this book out'
              }
       }

       // if book is in inventory
       const inventoriedBook = await dataAgent.
        inventoryDA.
        getInventoryByGoogleId(checkoutRequest.book.googleId);

      //check Waiting list
      if(inventoriedBook.some( (listed) =>
          listed.userId === profileResult.user.id ) ){
            throw {
                   thrown:true,
                   status: 404,
                   message: 'User is currently on the wait-list for this book'
            }
       }

      //check if inventoried book exist is available
      if(inventoriedBook.length>0){
         if( !inventoriedBook[0].available){
           let currentWaitTime =  Date.now() - inventoriedBook[0].booked.returnDate;
           if(inventoriedBook[0].waitList.length>0){
              const crntTTE:number =   getExpireTime();
              currentWaitTime += inventoriedBook[0].waitList.length *crntTTE;
           }
           return {
             bookId:inventoriedBook[0].bookGoogleId,
             listPosition:inventoriedBook[0].waitList.length,
             waitTime:currentWaitTime,
             inventoriedId:inventoriedBook[0].id,
           }
         //if inventory exist and book is available
         }else{
           const bookResult = await dataAgent.bookDA.getBookByGoogleId(checkoutRequest.book.googleId);
           const  bookedUpdate  =  await processCheckoutRequest(
              bookResult,
              profileResult,
              inventoriedBook[0],
              false);
            return await updateUserProfile(
              bookResult,
              profileResult,
              bookedUpdate,
              false)
         }
       //inventory does not exist
      }else{
        const bookResult = await dataAgent.bookDA.createNewBook(checkoutRequest.book);
        let emptyInventory:IInventoryDocument =  <IInventoryDocument>({});
        const bookedResult  =  await processCheckoutRequest(
          bookResult,
          profileResult,
          emptyInventory,
          false);

        return await updateUserProfile(
          bookResult,
          profileResult,
          bookedResult,
          false)
      }
   }

   async  addUserToBookWaitList(waitListRequest:any):Promise<any>{
       //1 --  profile = get User Profile
     const bookResult = await dataAgent.bookDA.
        getBookByGoogleId(waitListRequest.bookId);

     let profileResult:IProfileDocument = await dataAgent
         .profileDA
         .getProfileByUserId(waitListRequest.userId);

      // -- check waitListCount to ensure user has not added between wait
     if(profileResult.waitListCount === borrowerRules.maxWaitlist ){
          throw {
                   thrown:true,
                   status: 404,
                   message: 'User has maxed out their wait list options'
              }
     }
       // -- if user currently has this booked checked out
     if(profileResult.booksOut.filter( (booked) =>
               booked.book.googleId === waitListRequest.bookId &&
               booked.active  ) ){
          throw {
                   thrown:true,
                   status: 404,
                   message: 'User has currently checked this book out'
              }
     }

     const inventoriedBook = await dataAgent.
        inventoryDA.
        getInventoryByGoogleId(waitListRequest.bookId);

     const bookedResult =  await processCheckoutRequest(
          bookResult,
          profileResult,
          inventoriedBook,
          true);

     return await updateUserProfile(
          bookResult,
          profileResult,
          bookedResult,
          true)
   }
}
const BookingServices = new BookingService();
export { BookingServices}

