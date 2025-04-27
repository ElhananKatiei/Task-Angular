import { inject, Injectable } from '@angular/core';
import { LoginArguments, Manager } from '../model/entityes.type';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

type ActiveManager = Manager | undefined;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Manager:ActiveManager = undefined;
  http = inject(HttpClient);

  login( loginArguments:LoginArguments )
  {
    const url = 'http://localhost:5124/Login';
    return this.http.post( url, loginArguments );
  }
}
