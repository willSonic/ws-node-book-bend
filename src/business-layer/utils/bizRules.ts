
export const borrowerRules = {
    // ten days
    tenDayMS:7*24*60*60*1000,
    //dev fun 10 minutes
    tenMinMS:10*60*1000,
    //wait time for response from waitlist request
    twoMinMS: 2*60*1000,
    //maximum books a use can checkout
    maxCheckout:5,
    //maximum inventory waitlists a user can subscribe to
    maxWaitlist:10

};

export const createDate = ( time:number ) =>{
   return new Date(Date.now() + time);
};
