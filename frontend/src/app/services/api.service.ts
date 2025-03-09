import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private endpoint = 'http://localhost:8080/about'

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
