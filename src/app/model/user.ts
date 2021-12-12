import { Optional } from '@angular/core';
import { User } from './user.model';
export class UserClass implements User {
   public email!: string;
   public password!: string;
   public name!: string; 

   constructor(@Optional() private data?: any) {
      if(data)
      {
         this.email = data.email;
         this.name = data.name;
         this.password = data.password;
      }
   }
}
