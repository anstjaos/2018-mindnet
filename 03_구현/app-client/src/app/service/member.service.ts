import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Member } from '../model/member';
import { Filter } from '../model/filter';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class MemberService {
  private _route = 'http://218.233.209.78:8000/api/members';
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private _http: Http) { }

  getMember(filter: Filter): Observable<Member[]> {
    const url = `${this._route}/${filter.toString()}`;

    return this._http.get(url)
      .map((res) => res.json() as Member[])
      .pipe(catchError(this.handleError));
  }

  create(member: Member): Observable<Response> {
    let authorization: Filter = new Filter();

    const url = `${this._route}/${authorization.toString()}`;
    return this._http.post(url, JSON.stringify(member), { headers: this._headers })
      .pipe(catchError(this.handleError));
  }

  update(member: Member): Observable<Response> {
    let filter: Filter = new Filter();

    const url = `${this._route}/${member.id}${filter.toString()}`;
    return this._http.put(url, JSON.stringify(member), { headers: this._headers })
      .pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<Response> {
    let filter: Filter = new Filter();

    const url = `${this._route}/${id}${filter.toString()}`;
    return this._http.delete(url, { headers: this._headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
