import {
   IsDate, IsInt,  Min, Max,
   IsAlphanumeric, IsArray,
   MinLength, MaxLength, ArrayNotEmpty } from 'class-validator';

export class BookValidationSchema  {

     @IsAlphanumeric()
     googleId: string;

     @IsArray()
     @ArrayNotEmpty()
     authors: string[];

     @IsInt()
     @Min(0)
     @Max(10)
     averageRating: number;

     @MinLength(2)
     @MaxLength(800)
     description: string;


     @IsInt()
     @Min(1)
     @Max(10000)
     pageCount: number;

     @MinLength(2)
     @MaxLength(40)
     subtitle: string;

     @MinLength(2)
     @MaxLength(20)
     title: string;

     @IsArray()
     @ArrayNotEmpty()
     categories: string[];

     @IsInt()
     @Min(0)
     @Max(10)
     ratingsCount: number;

      @IsDate()
      publishedDate:Date;

      @MinLength(10)
      @MaxLength(20)
      publisher:string;

    constructor(bookInfo:any){
       this.googleId = bookInfo.googleId;
       this.authors = bookInfo.authors;
       this.averageRating = bookInfo.averageRating;
       this.description = bookInfo.description;
       //this.imageLinks = bookInfo.imageLinks;
       this.pageCount = bookInfo.pageCount;
       this.subtitle = bookInfo.subtitle;
       this.title = bookInfo.title;
       this.categories = bookInfo.categories;
       this.ratingsCount = bookInfo.ratingsCount;
       this.publishedDate = bookInfo.publishedDate;
       this.publisher = bookInfo.publisher;
    }
}
