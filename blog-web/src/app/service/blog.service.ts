import { Result } from './../models/result';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { userinfo } from '../pages/shell/userinfo/userinfo';

@Injectable({
    providedIn: 'root'
})

export class BlogService {
    constructor(
        private http: HttpClient
    ) { }
    login(user): Observable<Result<any>> {
        const loginUrl = 'http://127.0.0.1:8000/login';
        return this.http.post<Result<any>>(loginUrl, user);
    }
    registery(registerinfo): Observable<Result<any>> {
        const registerUrl = 'http://127.0.0.1:8000/register';
        return this.http.post<Result<any>>(registerUrl, registerinfo);
    }
    submit(healthycondition):Observable<Result<any>>{
        const submitUrl = 'http://127.0.0.1:8000/declaration';
        return this.http.post<Result<any>>(submitUrl, healthycondition);
    }
    getuserinfo(userinformation):Observable<Result<any>>{
        const getuserinfourl = 'http://127.0.0.1:8000/userinformation';
        return this.http.post<Result<any>>(getuserinfourl, userinformation);
    }
    getusercondition(username):Observable<Result<any>>{
        const getuserconditionurl = 'http://127.0.0.1:8000/usercondition';
        return this.http.post<Result<any>>(getuserconditionurl,username)
    }
    temsum(date):Observable<Result<any>>{
        const temsumurl = 'http://127.0.0.1:8000/statistics';
        return this.http.post<Result<any>>(temsumurl,date)
    }
    userinfo():Observable<Result<any>> {
        const userinfoUrl = 'http://localhost:8000/userinfo';
        return this.http.get<any>(userinfoUrl);
      }
    infoupdate(updateinfo):Observable<Result<any>>{
        const updateUrl = 'http://localhost:8000/infoupdate';
        return this.http.put<Result<any>>(updateUrl, updateinfo);
    }






    location():Observable<Result<any>>{
        const locationurl = 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=j8nT8XiIGIxbWBZXDfMptyMqNgRo31iX&output=json&coordtype=wgs84ll&location=31.225696563611,121.49884033194';
        return this.http.get<Result<any>>(locationurl)
    }
}



