import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
// import 'rxjs/Rx';
import { Observable } from 'rxjs'


@Injectable()
export class FileDeleteService
{
    constructor(private http:HttpClient){}
    deleteFile(file: String)
    {

        // console.log('WE ARE CALLING THE API TO DELETE THE FILE ...name is fine...checking file body')
        var body = { filename : file}

        console.log(body)

        return this.http.post('http://localhost:3000/file/delete',body)


    }



    // viewFile(file: String)
    // {
    //     console.log('WE ARE CALLING THE API TO VIEW THE FILE',file)
    //     var body = { filename: file }
    //     return this.http.post('http://localhost:3000/file/view',body,{
    //         responseType : 'blob',
    //         headers : new HttpHeaders().append('Content-Type','application/json')})
        
        

    // }
}