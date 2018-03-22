import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class MainRestProvider {

  	constructor(public http: HttpClient) {
    	console.log('Main Rest Provider');
  	}


    firePostServiceWithHeader(SERVICE_URL, dataParam, API_HEADER): Observable<{ }> {

      console.log('Post request with header')

      let tempHeader = {headers : API_HEADER};

      console.log(SERVICE_URL)
      console.log(dataParam)

      return this.http.post(SERVICE_URL, dataParam,  tempHeader)
                  .map(this.extractData)
                  .catch(this.handleError);
    }

    firePostServiceWithoutHeader(SERVICE_URL, dataParam): Observable<{ }> {

      console.log('Post request without header')
      console.log(SERVICE_URL)
      console.log(dataParam)

      return this.http.post(SERVICE_URL, dataParam)
                  .map(this.extractData)
                  .catch(this.handleError);
    } 


    // fireGetServiceWithHeader(SERVICE_URL, dataParam, API_HEADER): Observable<{ }> {

    //   let tempHeader = API_HEADER;

    //   let headerOptions = new RequestOptions({headers: tempHeader});

    //   console.log(SERVICE_URL)
    //   console.log(headerOptions)
    //   console.log(dataParam)

    //   return this.http.get(SERVICE_URL, dataParam)
    //               .map(this.extractData)
    //               .catch(this.handleError);
    // }


    fireGetServiceWithoutHeader(SERVICE_URL): Observable<{ }> {

      console.log(SERVICE_URL)

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
      console.log("Error Occured : ")
      console.log(error)
  	  return Observable.throw(error);
  	}

}
