import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { FileUploadModule } from 'ng2-file-upload'

import { UserService } from './User/user.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserListComponent } from './User/user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './User/user-create/user-create.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FileDeleteService } from './User/user-list/filedelete.service';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database'
// import { environment } from '../environments/environment';
// import { AngularFirestoreModule } from '@angular/fire/firestore'




const appRoutes: Routes = [             //We have basically defined a Routes object to define the routes for our reference.
  { path:'list', component: UserListComponent},
  { path:'create', component: UserCreateComponent},
  { path:'', redirectTo: '/list', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,    
    UserListComponent,
    UserCreateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabase,
    // AngularFirestoreModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)  //here you define the constants for the Router to point to
  ],
  providers: [UserService,FileDeleteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
