import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UpdPuestoService {

  idEmp = localStorage.getItem('empresaFact');
  constructor(
    private http: HttpClient
  ) { }

 
  getlistaPuestos(puesto){
    const token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        token
    });

    const url = URL_SERVICE.url + '/listapuesto/'+this.idEmp+'/'+puesto+'/2';

    return this.http.get( url, {headers} )
            .map( (resp: any) =>
                resp
            );
}


generarPDFA4(puesto){

  let token = localStorage.getItem('tokenFact');

  const headers = new HttpHeaders({
    token
  });

  const url = URL_SERVICE.url + '/listapuesto/'+this.idEmp+'/'+puesto+'/1';

  return this.http.get( url, {headers} )
      .map( (resp: any) =>
          resp
      );
}

}
