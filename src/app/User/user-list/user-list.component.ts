import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
//import 'rxjs/add/observable/of';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { FileDeleteService } from './filedelete.service';


const uri = 'http://localhost:3000/file/delete';

@Component({
  
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  //@Input() usr:any;

  uploader:FileUploader = new FileUploader({url:uri});
  attachmentList:any = [];

  constructor(private _userService: UserService,private http: HttpClient,private _router:Router,private fileService:FileDeleteService) { }
  @Input() users = []; 
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  ulists = [];
  fetchdata = function() //: <Observable>any
  {
    this.http.get("http://localhost:5555/userdata").subscribe(
      (res: Response) => {
        //console.log(res)
        this.users = res
      }
    )
  }


  url : any;
  confirmView = false;
  val: number;
  // imgBlob : Blob;
  
  
 

  

  ngOnInit(): void {


    console.log("now in list")
    
    this.fetchdata()
    console.log(this.users)

    // this.users = this._userService.getUsers()
    //this.users = this.ulists
    //console.log(this.users)
  }

  // view(fname: String)
  // {
  //   var filename = fname.slice(14)
  //   //console.log(filename)
  //   this.fileService.viewFile(filename).subscribe(
  //     data => this.imgBlob = data,
  //     error => console.log(error));

  //     console.log(this.imgBlob)




  // }

  // onSelectFile(event) { // called each time file input changes
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //     }
  //   }
  // }

  imgclick(id:number)
  {
    this.confirmView=true;
    this.val = id-1;

    console.log(`Image ${id} has been clicked`)
  }

  delete_user(id:number)
  {
    //const i = this.users.findIndex(e => e.id === id);
    //console.log(id)
    //this._router.navigate(['list']);

    this._userService.deleteuser(id).subscribe(
      () => {
        console.log(`Employee with ${id} is deleted`)
        this.fetchdata()
      }
    );
    

  }


  deletefile(fname: String)
  {

    var filename = fname.slice(14)
    console.log(filename)
    this.fileService.deleteFile(filename).subscribe(error => console.log(error))

  }

}
