import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Curso } from '../../models/cecy/curso';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CecyService {

  public url = environment.API_URL_COMBOS_CECY;
  constructor(private http:HttpClient) {}

    getCombos(url:string){
      return this.http.get(environment.API_URL_COMBOS_CECY + url);
    }
    getLis(url:string){
      return this.http.get<Curso[]>(environment.API_URL_COMBOS_CECY + url);
    }

    post(endpoint: string, body: any, token: any): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Authorization": ""+token+""
        })
      };
      return this.http.post(this.url + "" + endpoint, body, httpOptions);
    }
  
    get(endpoint: string, token: any, params?: any, reqOpts?: any): Observable<any> {
      if (!reqOpts) {
        reqOpts = {
          params: new HttpParams()
        };
      }
  
      if (params) {
        reqOpts.params = new HttpParams();
        for (let k in params) {
          reqOpts.params.set(k, params[k]);
        }
      }
  
      reqOpts = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Authorization": ""+token+""
        })
      };
  
      return this.http.get(this.url + "" + endpoint, reqOpts);
    }

}
