import { IsEmail, Length ,IsAlphanumeric, IsAlpha} from "class-validator";


export class UserValidationSchema  {

     @Length(5, 15)
     @IsAlphanumeric()
     userName: string;


     @Length(2, 15)
     password: string;


     @Length(2, 15)
     @IsAlpha()
     firstName: string;


     @Length(2, 15)
     @IsAlpha()
     lastName: string;

     @IsEmail()
     email: string;

    constructor(userInfo:any){
       this.userName = userInfo.userName;
       this.password = userInfo.password;
       this.firstName = userInfo.firstName;
       this.lastName= userInfo.lastName;
       this.email= userInfo.email;
    }
}
