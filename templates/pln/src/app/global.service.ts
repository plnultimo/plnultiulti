import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';


@Injectable()
export class GlobalService {

  public static HOST = 'http://localhost:8000/';//default

  public static AgregarTexto = "listarPredicciones/";

  constructor(private _http: Http) {
  }

  static getHeadersOption(): RequestOptions {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return options;
  }

}
