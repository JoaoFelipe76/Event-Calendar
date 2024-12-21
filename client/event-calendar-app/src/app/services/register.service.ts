import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'src/app/types/login-response.type';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl: string = `${environment.baseUrlBackend}`;

  constructor(private httpClient: HttpClient) { }


  signup(email: string, login: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", {email, login,password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("login", value.login)
      })
    )
  }
}
