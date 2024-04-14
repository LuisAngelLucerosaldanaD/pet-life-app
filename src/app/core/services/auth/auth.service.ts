import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SesionRequest, SessionResponse} from '../../models/auth/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _urlBase: string = 'https://dummyjson.com/auth/login';

  constructor(
    private http: HttpClient
  ) {
  }

  public login(data: SesionRequest): Observable<SessionResponse> {
    return this.http.post<SessionResponse>(this._urlBase, data);
  }

}
