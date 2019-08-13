import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject,forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _registerUrl='http://localhost:45236/api/register';
  private _loginUrl='http://localhost:61291/api/login';
  

  private isLogin=false;
  CommonUrlNew:string='';
  constructor(private _http:HttpClient) {
    this.CommonUrlNew = environment.CommonUrl;
   }

   registerUser(user){
     return this._http.post<any>(this._registerUrl,user);
    
   }
   get(url){
    url=this.CommonUrlNew+url;
    return this._http.get(url);
  }
   post(url,data:any){
    url=this.CommonUrlNew+url;
    return this._http.post(url,data);
  }
  delete(url){
    url=this.CommonUrlNew+url;
    return this._http.delete(url);
  }

  put(url,data){
    url=this.CommonUrlNew+url;
    return this._http.put(url,data);
  }
   loginUser(user){
     return this._http.post<any>(this._loginUrl,user);
   }

  
   loggedIn(){
     return !!localStorage.getItem('token');
   }
   setLogin(value:boolean){
    this.isLogin=value;
   }

   get IsLoggedIn(){
    return this.isLogin;
   }
   getMethod(url:string):Observable<any>{
    url=this.CommonUrlNew+url;
    return this._http.get<myData>(url);
   }
   private subject=new Subject<number>();
   subject$=this.subject.asObservable();
   pushDataToSubject(value:number){
    this.subject.next(value)
   }
}

interface myData{
  success:boolean,
  message:string
}