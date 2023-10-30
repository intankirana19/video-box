import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { API_USER } from '../constants/api-path';
import { toSignal } from '@angular/core/rxjs-interop';


const userMapper = (userData: UserInterface) => {
  const { id, name, pictureUrl } = userData;
  
  return {
    id,
    name,
    pictureUrl
  }
}

const initialValue: UserInterface = {
  id: '',
  name:'',
  pictureUrl: ''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  userSignalData$ = signal<UserInterface>(initialValue);

  // rxjs
  getUser(): Observable<UserInterface> {
    return this.http.get(API_USER) as Observable<UserInterface>;
  }

  // signal+rxjs trials
  private users$ = this.http.get<UserInterface>(API_USER).pipe(
    map((userData) =>
      userMapper(userData)
    )
  );

  usersSignalService$ = toSignal(this.users$, {initialValue});

  filterVideoOwner(videoOwner: UserInterface) {
    return videoOwner.id === this.usersSignalService$().id;
  }

  setUserSignalData(data: UserInterface) {
    this.userSignalData$.set(data);
  }

}
