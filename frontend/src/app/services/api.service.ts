import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private endpoint = environment.apiBaseUrl + '/about'

  constructor(
    private httpClient: HttpClient
  ) { }

  getAbout(id: number): Observable<object> {
    return this.httpClient.get<object>(
      `${this.endpoint}?id=${id}`,
      { withCredentials: true },
    )
  }
}
