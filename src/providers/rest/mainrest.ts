import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';



@Injectable()
export class MainRestProvider {

  	constructor(public http: HttpClient) {
  	}


    firePostServiceWithHeader(SERVICE_URL, dataParam, API_HEADER): Observable<{ }> {

      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Request-Method', 'POST');
      headers.append('Access-Control-Request-Headers', 'Content-Type');

      return this.http.post(SERVICE_URL, dataParam, {headers})
                  .map(this.extractData)
                  .catch(this.handleError);
    }

    firePostServiceWithoutHeader(SERVICE_URL, dataParam): Observable<{ }> {

      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Request-Method', 'POST');
      headers.append('Access-Control-Request-Headers', 'Content-Type');

      return this.http.post(SERVICE_URL, dataParam,{headers})
                  .map(this.extractData)
                  .catch(this.handleError);
    } 



    fireGetServiceWithoutHeader(SERVICE_URL): Observable<{ }> {
      return this.http.get(SERVICE_URL)
                  .map(this.extractData)
                  .catch(this.handleError);
    } 
   

  	private extractData(res: Response) {
  	  let body = res;
  	  return body || { };
  	}

  	private handleError (error: Response | any) {
  	  let errMsg: string;
  	  if (error instanceof Response) {
  	    const err = error || '';
  	    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  	  } else {
  	    errMsg = error.message ? error.message : error.toString();
  	  }
  	  return Observable.throw(error);
  	}

}
