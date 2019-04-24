import * as config from 'config';

export const borrowerRules = {
    // ten days
    tenDayMS:7*24*60*60*1000,

    //dev fun 2Hours
    twoHrMS:2*60*60*1000,
    //dev fun 10 minutes
    tenMinMS:10*60*1000,
    //wait time for response from waitlist request
    twoMinMS: 2*60*1000,
    //maximum books a use can checkout
    maxCheckout:5,
    //maximum inventory waitlists a user can subscribe to
    maxWaitlist:10

};

export function getExpireTime():number {
    return borrowerRules[ `${config.get('borrow_time.ttE')}` ];
};

export const createDate = ( time:number ) =>{
   return new Date(Date.now() + time);
};


export const messageTypes = {
    BOOK_CHECKED_OUT:'BOOK_CHECKED_OUT',
    BOOK_CHECKED_IN:'BOOK_CHECKED_IN',
    BOOK_FORCE_CHECKED_IN:'BOOK_FORCE_CHECKED_IN',
    BOOK_USER_WAIT_LISTED:'BOOK_USER_WAIT_LISTED'
};

export const createMessageText = (type, options)=>{
    let message='';
    switch(type){
        case messageTypes.BOOK_CHECKED_OUT:
            message = `You have checked out ${ options.bookTitle } on`+
                       ` ${ options.checkOutDate } and it will need to be returned`+
                        `${ options.checkInDate }.`;
        break;
        case messageTypes.BOOK_USER_WAIT_LISTED:
            message = `You have been added to the waitList ${ options.bookTitle }.`;
         break;
    }
    return message;
};


