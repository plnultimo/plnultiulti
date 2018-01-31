import {Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AppService {
  constructor(private _http: Http) {
  }

  AgregarTexto(texto:String) {
    let params = {"texto": texto};
    console.log("wwarren");
    return this._http.post(GlobalService.HOST + GlobalService.AgregarTexto,
      params,
      GlobalService.getHeadersOption())
      .map(response => response.json());
  }
  ActualizarTexto() {
    return this._http.get(GlobalService.HOST + GlobalService.AgregarTexto,
      GlobalService.getHeadersOption())
      .map(response => response.json());
  }
}
