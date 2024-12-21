import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient, private router: Router) {


  }

  public login(login: string, password: string): Observable<any> {

    const url = `${environment.baseUrlBackend}/login`;

    return this.httpClient.post(url, { login, password }, { responseType: 'json' }).pipe(
      map((data) => this.setTokenLocalStorage(data)),
      catchError((err) => {
        this.removerTokenLocalStorage();
        throw 'Falha ao efetuar login.'
      })
    )

  }

  public getToken(): string | null {
    return localStorage.getItem(environment.token);
  }

  private setTokenLocalStorage(response: any): void {
    const { type, token, _ } = response;
    localStorage.setItem(environment.token, token)
  }

  public removerTokenLocalStorage(): void {
    localStorage.removeItem(environment.token);
  }


  logout() {
    this.removerTokenLocalStorage();
    this.router.navigate(['/login']);
  }


}
