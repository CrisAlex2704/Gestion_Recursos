import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class DetalleValorizacionService {
  idEmp = localStorage.getItem('empresaFact');

  constructor(
    private http: HttpClient
  ) { }

  getDetalleValorizacion(idval: string){
    const token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        token
    });

    const url = URL_SERVICE.url + '/detallevalorizacion/'+this.idEmp +"/"+ idval ;


    return this.http.get( url, {headers} )
            .map( (resp: any) =>
                resp
            );
}

agregarDetalleValorizacion(descval: string, valorizacion: string ) {
  
    const val = {
      empresa: this.idEmp,
  descVal: descval,
  valorizacion: valorizacion
  

  
    }
    const token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
           token
    });
    
    const url = URL_SERVICE.url + '/detallevalorizacion';
  
    return this.http.post( url, val, {headers} )
            .map( (resp: any) =>
                resp
            );
  }
  
  
updValorizacion(id: string,
  descval: string,
  valorizacion: string,
){
  let token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
    token
  });

  const url = URL_SERVICE.url + '/detallevalorizacion/' + id;

  const val = {
    empresa: this.idEmp,
    descval: descval,
    valorizacion: valorizacion,
       
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

  const url = URL_SERVICE.url + '/detallevalorizacion/buscar/' + termino + "/" + this.idEmp;

  return this.http.get( url, {headers} )
              .map( (resp: any) =>
                  resp.Detallevalorizacion
              );
}

}
