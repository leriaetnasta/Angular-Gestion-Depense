import {HttpClient, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {environment} from "../../environments/environment";
import {CustomHttpRespone} from "../model/CustomHttpResponse.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.backendHost+'/user/list');
  }

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(environment.backendHost+'/user/add', formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(environment.backendHost+'/user/update', formData);
  }

  public resetPassword(email: string): Observable<CustomHttpRespone> {
    return this.http.get<CustomHttpRespone>(environment.backendHost+'/user/resetpassword/${email}');
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(environment.backendHost+'/user/updateProfileImage', formData,{reportProgress: true, observe: 'events' });
  }

  public deleteUser(username: string): Observable<CustomHttpRespone> {
    return this.http.delete<CustomHttpRespone>(environment.backendHost+'/user/delete/${username}');
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
      return JSON.parse(localStorage.getItem('users')||"");
  }

  public createUserFormDate(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }

}
