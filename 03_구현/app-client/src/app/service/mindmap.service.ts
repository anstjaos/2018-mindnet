import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Mindmap } from '../model/mindmap';
import { Filter } from '../model/filter';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class MindmapService {
  private _route = 'http://218.233.209.78:8000/api/mindmaps';
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private _http: Http) { }

  getMindmap(filter: Filter): Observable<Mindmap[]> {
    const url = `${this._route}/${filter.toString()}`;
    
    return this._http.get(url)
      .map((res) => res.json() as Mindmap[])
      .pipe(catchError(this.handleError));
  }

  create(mindmap: Mindmap): Observable<Response> {
    let authorization: Filter = new Filter();

    const url = `${this._route}/${authorization.toString()}`;
    return this._http.post(url, JSON.stringify(mindmap), { headers: this._headers })
      .pipe(catchError(this.handleError));
  }

  update(mindmap: Mindmap): Observable<Response> {
    let filter: Filter = new Filter();

    const url = `${this._route}/${mindmap._id}${filter.toString()}`;
    return this._http.put(url, JSON.stringify(mindmap), { headers: this._headers })
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
