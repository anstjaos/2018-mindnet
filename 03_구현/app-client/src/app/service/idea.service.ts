import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Idea } from '../model/idea';
import { Filter } from '../model/filter';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Recommend } from '../model/recommend';

import 'rxjs/add/operator/map';

@Injectable()
export class IdeaService {
  private _route = 'http://218.233.209.78:8000/api/ideas';
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private _http: Http) { }

  getIdea(filter: Filter): Observable<Idea[]> {
    const url = `${this._route}/${filter.toString()}`;

    return this._http.get(url)
      .map((res) => res.json() as Idea[])
      .pipe(catchError(this.handleError));
  }

  create(idea: Idea): Observable<Idea> {
    let authorization: Filter = new Filter();

    const url = `${this._route}/${authorization.toString()}`;
    return this._http.post(url, JSON.stringify(idea), { headers: this._headers })
      .map((res) => res.json() as Idea)
      .pipe(catchError(this.handleError));
  }

  update(idea: Idea): Observable<Response> {
    let filter: Filter = new Filter();

    const url = `${this._route}/${idea._id}${filter.toString()}`;
    return this._http.put(url, JSON.stringify(idea), { headers: this._headers })
      .pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<Response> {
    let filter: Filter = new Filter();

    const url = `${this._route}/${id}${filter.toString()}`;
    return this._http.delete(url, { headers: this._headers })
      .pipe(catchError(this.handleError));
  }

  upload(id: string, fd: FormData): Observable<Response> {
    let filter: Filter = new Filter();

    const url = `${this._route}/upload/${id}${filter.toString()}`;
    return this._http.post(url, fd)
      .map((res) => res)
      .pipe(catchError(this.handleError));
  }

  recommend(filter : Filter) : Observable<Recommend[]>{
    const url = `${this._route}/recommend/${filter.toString()}`;
    return this._http.get(url, { headers: this._headers })
    .map((res) => res.json() as Recommend[])
      .pipe(catchError(this.handleError));

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
