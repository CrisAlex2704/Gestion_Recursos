import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ValorizacionService {

  idEmp = localStorage.getItem('empresaFact');
  constructor(
    private http: HttpClient

  ) { }
  
  getValorizacion(){
    const token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        token
    });

    const url = URL_SERVICE.url + '/valorizacion/'+this.idEmp;


    return this.http.get( url, {headers} )
            .map( (resp: any) =>
                resp
            );
}


agregarValorizacion(puesto: string, total: number ) {

  const val = {
    puesto: puesto,
    total: total,
    empresa: this.idEmp
  }
  const token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
         token
  });
  
  const url = URL_SERVICE.url + '/valorizacion';

  return this.http.post( url, val, {headers} )
          .map( (resp: any) =>
              resp
          );
}

updValorizacion(id: string, total: string){
  let token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
    token
  });

  const url = URL_SERVICE.url + '/valorizacion/' + id;

  const val = {
    empresa: this.idEmp,
    total: total,

  }

  return this.http.put( url, val, { headers} )
    .map((resp: any) =>
        resp
    );
}


searchVal(termino: string){
  let token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
    token
  });

  const url = URL_SERVICE.url + '/valorizacion/buscar/' + termino + "/" + this.idEmp;

  return this.http.get( url, {headers} )
              .map( (resp: any) =>
                  resp.valorizacion
              );
}

countVal(){
  const token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      token
  });

  const url = URL_SERVICE.url + '/valorizacion/contar/'+this.idEmp;


  return this.http.get( url, {headers} )
          .map( (resp: any) =>
              resp
          );
}

}
