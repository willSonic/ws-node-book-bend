import { IProfileResponse } from '../responses';
import { borrowerRules, messageTypes, createMessageText } from '../../business-layer/utils/bizRules';
import { DataAgentServices as dataAgent } from '../../data-layer/data-agents';
import { ProfileModel } from '../../data-layer/models';
import { IBookDocument } from '../../data-layer/data-abstracts/repositories/book';
import { IUserDocument } from '../../data-layer/data-abstracts/repositories/user';
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
                 interest => profileResult.interestCategories.
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


async function prepareProfileData(
      bookRef:string,
      profileResult:IProfileDocument,
      inventoriedBook:IInventoryDocument,
      waitList:boolean = false
   ):Promise<any>{
     const prevBooked = profileResult.booksOut.filter( booked =>
           booked.book.googleId === bookRef);
     if(!waitList ){
         //create new Booked entity associating User and Book
         const bookedUpdate:IBookedDocument  =  prevBooked.length>0?
            await dataAgent.bookedDA.updateBooked({...prevBooked[0],active:true }):
            await dataAgent.bookedDA.createNewBooked({
              book: bookRef,
              user: profileResult.user.id,
              active: true
            });
         //create book check expire record to get event...
         const  bookToExpire:IBookedExpireEventDocument =  await dataAgent.
          bookedExpireEventDA.createBookedExpireEvent(
            (bookedUpdate.id).toString());
         //update entities
         const updateInventory =  await dataAgent.inventoryDA.
             updateInventory( {
             id:inventoriedBook.id,
             booked:bookedUpdate.id,
             available:false,
           });
         return bookedUpdate;
     }else{

        inventoriedBook.waitList.push({
            userId: (profileResult.user.id).toString(),
            requestDate:new Date(),
        });

        const updateInventory =  await dataAgent.inventoryDA.
             updateInventory( inventoriedBook);
         return updateInventory;
     }

}


class BookingService{
   async bookCheckOutService( checkoutRequest:any):Promise<any>{
       //1 --  profile = get User Profile
      let profileResult:IProfileDocument = await dataAgent
         .profileDA
         .getProfileByUserId(checkoutRequest.userId);

       //2
       // -- if checkout count greater than max return
      if(profileResult.checkedOutCount === borrowerRules.maxCheckout ){
          throw {
                   thrown:true,
                   status: 404,
                   message: 'User has checked out their maximum number of books allowed'
              }
      }
       // -- if user currently has this booked checked out
      if(profileResult.booksOut.some( booked =>
               booked.book.googleId === checkoutRequest.book.id &&
               booked.active  ) ){
          throw {
                   thrown:true,
                   status: 404,
                   message: 'User has currently checked this book out'
              }
       }

       // if book is in inventory
       const inventoriedBook = await dataAgent.
        inventoryDA.
        getInventoryByGoogleId(checkoutRequest.book.id);

      //check Waiting list
      if(inventoriedBook && inventoriedBook.waitList.some( listed =>
          listed.userId === profileResult.user.id ) ){
            throw {
                   thrown:true,
                   status: 404,
                   message: 'User is currently on the wait-list for this book'
            }
       }

      //check if inventoried book exist is available
      if(inventoriedBook){
         if( !inventoriedBook.available){
           let currentWaitTime =  Date.now() - inventoriedBook.booked.returnDate;
           if(inventoriedBook.waitList.length>0){
              currentWaitTime += inventoriedBook.waitList.length *
              borrowerRules.twoMinMS;
           }
           return {
             bookId:inventoriedBook.bookGoogleId,
             listPosition:inventoriedBook.waitList.length,
             waitTime:currentWaitTime,
             inventoriedId:inventoriedBook.id,
           }
         //if inventory exist and book is available
         }else{
           const bookResult = await dataAgent.bookDA.getBookByGoogleId(checkoutRequest.book.id);
           const  bookedUpdate  =  await prepareProfileData(
              checkoutRequest, profileResult, bookResult, inventoriedBook);
            return await updateUserProfile(checkoutRequest, profileResult, bookedUpdate)
         }
       //inventory does not exist
      }else{
        const bookResult = await dataAgent.bookDA.createNewBook(checkoutRequest.book);
        const  bookedUpdate  =  await prepareProfileData(
          checkoutRequest.book.id, profileResult, inventoriedBook);
        return await updateUserProfile(checkoutRequest, profileResult, bookedUpdate)
      }
   }

   async  addUserToBookWaitList(waitListRequest:any):Promise<any>{
       //1 --  profile = get User Profile
     const bookResult = await dataAgent.bookDA.
        getBookByGoogleId(waitListRequest.bookId)
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
     if(profileResult.booksOut.some( booked =>
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
     const updatedInventory =  await prepareProfileData(
          waitListRequest.bookId,
          profileResult,
          inventoriedBook,
          true);
     const emptyBookedData = <IBookedDocument>({});

     return await updateUserProfile(
          bookResult,
          profileResult,
          emptyBookedData,
          true)
   }
}
const BookingServices = new BookingService();
export { BookingServices}

