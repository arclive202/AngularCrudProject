import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UniqueEmailValidator } from './validator.directive'
import { forbiddenNameValidator, dateMinimumValidator } from '../../shared/forbidden-name.directive';
// import { identityRevealedValidator } from '../../shared/identity-revealed.directive';
// import { UniqueAlterEgoValidator } from '../../shared/alter-ego.directive';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import { FileSelectDirective, FileUploader } from 'ng2-file-upload';




import * as _ from 'lodash';


import { User } from '../../models/user.model'

const uri = 'http://localhost:3000/file/upload';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit 
{
  

  uploader:FileUploader = new FileUploader({url:uri});
  attachmentList:any = [];



  hero = { name: '', email: '',phno:'0000000000',bdate:'2000-01-01', addr:''};

  heroForm: FormGroup;  //basically the main name of the form. (replace heroform with employee form)
  newUser = [];
  imagepath : String;
  selectedFile : File;
  api = "http://localhost:3000";
  selectedFileType = false;
  disable =false;
  


  // related to image upload
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
//
  
  

  

  // isEmailUnique(control: FormControl)
  // {
  //     console.log(control.value)
  //     const q = new Promise()
  // }

  ngOnInit(): void 
  {

    console.log("Now in Create")
      this.heroForm = new FormGroup({
      name: new FormControl(this.hero.name, [Validators.required,Validators.minLength(4),forbiddenNameValidator(/Admin/i)]),
      email: new FormControl(this.hero.email,[Validators.required,Validators.email],[this.emailValidation.validate.bind(this.emailValidation)]),
      phno: new FormControl(this.hero.phno, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      bdate: new FormControl(this.hero.bdate, [Validators.required,dateMinimumValidator('1900-01-01')]),   //Date Validation is yet to be figured out
      addr: new FormControl(this.hero.addr, Validators.required),
          }); // <-- add custom validator at the FormGroup level

          console.log(this.heroForm.invalid)
    

    // console.log(this.newUser)

  }
  onSelectFile(e)
  {
    if(e.target.files)
    {
      this.selectedFile = <File> e.target.files[0]
      console.log(this.selectedFile.type)

      if (!(this.selectedFile.type).includes("image"))
      {
        
        this.selectedFileType=true
        this.disable = false
        
      }
      else{
        this.selectedFileType=false
        this.disable = true
        
      }


      this.imagepath = 'assets/images/'+ e.target.files[0]['name']
    }
  }



  get name() { return this.heroForm.get('name'); }

  get email() { return this.heroForm.get('email'); }

  get phno() { return this.heroForm.get('phno'); }

  get bdate() { return this.heroForm.get('bdate'); }

  get addr() { return this.heroForm.get('addr'); }
  postid;


  OnSubmit(): void
  {
    // const fd = new FormData();
    // fd.append('file', this.selectedFile);
    // console.log(fd)
    // this.http.post<any>(`${this.api}`, fd)
    //       .subscribe(res => {
    //         console.log(res);
    //       });
    console.log('LETS HAVE A LOOK AT UPLOAD QUEUE')

    console.log(this.uploader.queue)
    this.uploader.queue[0].upload()
    
    //console.log(this.heroForm.getRawValue())
    this.newUser = this.heroForm.getRawValue()
    this.newUser["imgPath"] = this.imagepath
    this.newUser["imgFile"] = this.selectedFile
    console.log(this.selectedFile)
    this._userService.SaveUser(this.newUser).toPromise().then((data: any) => { console.log(data)})
    
    console.log("Transferring over to List")
    this._userService.saveUser(this.newUser)
    setTimeout(()=>{this._router.navigate(['list'])},5000);
    

  }

  constructor(private _userService: UserService, private _router: Router,private http: HttpClient,private emailValidation: UniqueEmailValidator)
  {
    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {

      console.log('THIS IS THE RESPONSE FROM UPLOAD PLACE' )
      console.log(response)
      this.attachmentList.push(JSON.parse(response));

      console.log('THIS ATTACHMENT')
      console.log(this.attachmentList)
    
    }
   }


  //constructor(private alterEgoValidator: UniqueAlterEgoValidator) { }

  
  

}




///////////////////////////////////////////////

/* tslint:disable: member-ordering forin */



// @Component({
//   selector: 'app-hero-form-reactive',
//   templateUrl: './hero-form-reactive.component.html',
//   styleUrls: ['./hero-form-reactive.component.css'],
// })
// export class HeroFormReactiveComponent implements OnInit {

//   powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

//   hero = { name: 'Dr.', email: 'abc@xyz',phno:'0000000000',bdate:'01/01/2000', addr:'Bangalore',power: this.powers[0] };

//   heroForm: FormGroup;  //basically the main name of the form. (replace heroform with employee form)

//   ngOnInit(): void {
//     this.heroForm = new FormGroup({
//       name: new FormControl(this.hero.name, [
//         Validators.required,
//         Validators.minLength(4),
//         forbiddenNameValidator(/bob/i)
//       ]),
//       email: new FormControl(this.hero.email,Validators.email),
//       phno: new FormControl(this.hero.phno, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
//       bdate: new FormControl(this.hero.bdate, Validators.required),   //Date Validation is yet to be figured out
//       addr: new FormControl(this.hero.addr, Validators.required),
//       //  {
//       //   asyncValidators: [this.alterEgoValidator.validate.bind(this.alterEgoValidator)],
//       //   updateOn: 'blur'
//       // }),
//       power: new FormControl(this.hero.power, Validators.required)
//     },  { validators: identityRevealedValidator }); // <-- add custom validator at the FormGroup level
//   }

//   get name() { return this.heroForm.get('name'); }

//   get power() { return this.heroForm.get('power'); }

//   get email() { return this.heroForm.get('email'); }

//   get phno() { return this.heroForm.get('phno'); }

//   get bdate() { return this.heroForm.get('bdate'); }

//   get addr() { return this.heroForm.get('addr'); }

//   constructor(private alterEgoValidator: UniqueAlterEgoValidator) { }


  

// }






