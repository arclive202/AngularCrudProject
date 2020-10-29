import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

//Initially we are going to define the service and pass some values, later on we will be passing the values
//first we need to register the service
@Injectable()
export class UserService 
{
    ulists = [];
    fetch = function() //: <Observable>any
  {
    this.http.get("http://localhost:5555/userdata").subscribe(
      (res: Response) => {
        //console.log(res)
        this.ulists = res
      }
    )
  }
    constructor(private http:HttpClient) {}
     userList = [
        {
            
            name : "Test1",
            email : "test1@test.com",
            phno : "1234567890",
            bdate: new Date('01/01/2000'),
            addr:"bng01",
            imgPath : "assets/images/img01.jpg"
      
        },
        {
          
          name : "Test2",
          email : "test2@test.com",
          phno : "2234567890",
          bdate: new Date('02/01/2000'),
          addr:"bng01",
          imgPath : "assets/images/img02.jpg"
      
      },
      {
        
        name : "Test3",
        email : "test3@test.com",
        phno : "3234567890",
        bdate: new Date('03/01/2000'),
        addr:"bng03",
        imgPath : "assets/images/img03.png"
      
      }
        ]
    
    getUsers()
    {
        return this.userList
    }

    SaveUser(usr: any){
        console.log(usr)
       return this.http.post<any>("http://localhost:5555/userdata",usr)
   
     }


     deleteuser(id: number): Observable<void>
     {
        console.log(id)

        return this.http.delete<void>(`http://localhost:5555/userdata/${id}`)
     }

    saveUser(user)
    {
        
        this.userList.push(user)
    }

    isEmailTaken(email: string):Observable<boolean>
    {
        const isTaken = this.checkemail(email)

        return of(isTaken).pipe(delay(400));

    }


    checkemail(email: string):boolean
    {
         this.fetch()
        
        let users = this.ulists
        //console.log(users)
        //var e: string = [];
        for (let u of users)
        {
            //e.push(u.email)
            // console.log('user x \n')
            // console.log(u.email)
        
            if (u.email.toUpperCase() === email.toUpperCase())
            {
                return true;
            }

         }

  
        return false;

    }





}