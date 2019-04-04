import {
   IsDate, ValidateNested,
   IsAlphanumeric, IsBoolean} from "class-validator";

export class WaitListItem{
     @IsAlphanumeric()
     userRef: string;

     @IsDate()
     requestDate: Date;
}


export class InventoryValidationSchema  {

     @IsAlphanumeric()
     bookRef: string;

     @IsAlphanumeric()
     currentUserRef: string;

     @IsBoolean()
     available: boolean;

     @IsDate()
     checkOutDate: Date;

     @IsDate()
     returnDate: Date;

     @ValidateNested()
     waitList: WaitListItem[];

    constructor(inventoryInfo:any){
       this.bookRef = inventoryInfo.bookRef;
       this.currentUserRef = inventoryInfo.currentUserRef;
       this.available = inventoryInfo.available;
       this.checkOutDate= inventoryInfo.checkOutDate;
       this.returnDate= inventoryInfo.returnDate;
       this.waitList= inventoryInfo.waitList;
    }
}
