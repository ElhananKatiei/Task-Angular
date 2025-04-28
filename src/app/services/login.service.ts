import { inject, Injectable } from '@angular/core';
import { LoginArguments, Manager } from '../model/entityes.type';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { BACK_END_URL } from '../../../environment';

type ActiveManager = Manager | undefined;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Manager:ActiveManager = undefined;
  http = inject(HttpClient);

  login( loginArguments:LoginArguments )
  {
    const url = BACK_END_URL +'/Login';
    return this.http.post( url, loginArguments );
  }
}
