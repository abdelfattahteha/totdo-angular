import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGaurd } from './services/auth-gaurd.service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { ErrorInterceptor } from './services/error-interceptor.service';


const routes:Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: '' ,redirectTo: 'home' , pathMatch:'full'},
  { path: 'home', component: TodoListComponent, canActivate: [AuthGaurd]},
  { path: 'error/:status', component: ErrorPageComponent},
  { path: '**', redirectTo:'error/404', pathMatch:'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TodoListComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatMenuModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGaurd,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
