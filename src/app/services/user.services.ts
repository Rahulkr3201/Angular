import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private API_URL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}
   // STEP 2.1: Create API method
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }
}
