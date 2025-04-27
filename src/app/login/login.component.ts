import { Component, inject, signal } from '@angular/core';
import { LoginService } from '../services/login.service';
import { LoginArguments, Manager } from '../model/entityes.type';
import { catchError } from 'rxjs';
import { Event, Router } from '@angular/router';

@Component( {
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
} )
export class LoginComponent
{
  loginService = inject( LoginService );
  title = signal( this.loginService.Manager?.name );
  router = inject( Router );
  userName = signal( "" );
  password = signal( 0 );

  updateUserName( input: any )
  {
    const inputValue: string = input.target.value;
    this.userName.set( inputValue );
  }

  updatePassword( input: any )
  {
    const inputValue: number = input.target.value;
    this.password.set( inputValue );
  }


  HandleLogin( event: any )
  {
    const loginArguments: LoginArguments = { Name: this.userName(), Password: this.password() };
    this.loginService.login( loginArguments ).pipe(
      catchError( ( err ) =>
      {
        console.log( err );
        throw err;
      } )
    ).subscribe( ( result: any ) =>
    {
      if ( result ) {
        this.loginService.Manager = result;
        console.log(this.loginService.Manager);
        this.router.navigate( [ "/" ] )
        
      }
    } )
  }
}
