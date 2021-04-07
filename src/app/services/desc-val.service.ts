import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class DescValService {

  idEmp = localStorage.getItem('empresaFact');
  constructor(
    private http: HttpClient
  ) { }

  
  getDescValorizacion(){
    const token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        token
    });

    const url = URL_SERVICE.url + '/descval/'+this.idEmp;


    return this.http.get( url, {headers} )
            .map( (resp: any) =>
                resp
            );
}

agregarDescValorizacion(
descripcion: string,
observacion: string,
calificacion: string,
subtitulo: string,
titulo: string ) {

  const val = {

descripcion: descripcion,
observacion: observacion,
calificacion: calificacion,
subtitulo: subtitulo,
titulo: titulo,
    empresa: this.idEmp,
    estado:'true'

  }
  const token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
         token
  });
  
  const url = URL_SERVICE.url + '/descval';

  return this.http.post( url, val, {headers} )
          .map( (resp: any) =>
              resp
          );
}


updValorizacion(id: string,
  descripcion: string,
observacion: string,
calificacion: string,
subtitulo: string,
titulo: string 
){
  let token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
    token
  });

  const url = URL_SERVICE.url + '/descval/' + id;

  const val = {
    descripcion: descripcion,
    observacion: observacion,
    calificacion: calificacion,
    subtitulo: subtitulo,
    titulo: titulo,
        empresa: this.idEmp,
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

  const url = URL_SERVICE.url + '/descval/buscar/' + termino + "/" + this.idEmp;

  return this.http.get( url, {headers} )
              .map( (resp: any) =>
                  resp.descval
              );
}
}
