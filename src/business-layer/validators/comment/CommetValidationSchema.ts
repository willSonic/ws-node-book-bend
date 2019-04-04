import {
   IsAlphanumeric,
   MinLength, MaxLength,
} from 'class-validator';

export class CommentValidationSchema  {
     @IsAlphanumeric()
     bookRef: string;

     @IsAlphanumeric()
     userRef: string;

     @MinLength(2)
     @MaxLength(800)
     text: string;

     constructor(commentInfo:any){
        this.bookRef = commentInfo.bookRef;
        this.userRef= commentInfo.userRef;
        this.text= commentInfo.text;
     }
}
