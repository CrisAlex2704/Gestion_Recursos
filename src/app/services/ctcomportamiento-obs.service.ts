import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CTcomportamientoObsService {

  idEmp = localStorage.getItem('empresaFact');
  constructor(
    private http: HttpClient
  ) { }

  
  getCtComportamiento(){
    const token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        token
    });

    const url = URL_SERVICE.url + '/compTecObs/'+this.idEmp;


    return this.http.get( url, {headers} )
            .map( (resp: any) =>
                resp
            );
}



getCt(idCT){
  const token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      token
  });

  const url = URL_SERVICE.url + '/compTecObs/buscarCT/'+this.idEmp+'/'+idCT;


  return this.http.get( url, {headers} )
          .map( (resp: any) =>
              resp
          );
}



agregarCtComportamiento(numero: string, nivel: string, comportamiento: string,competenciaTecnica: string ) {

  const grup = {
    comportamiento:comportamiento,
    empresa: this.idEmp,
    estado:'true',
    numero:numero,
    nivel:nivel,
    competenciaTecnica:competenciaTecnica

  
  }
  const token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
         token
  });
  
  const url = URL_SERVICE.url + '/compTecObs';

  return this.http.post( url, grup, {headers} )
          .map( (resp: any) =>
              resp
          );
}


updCtComportamiento(comportamiento: string, id: string, numero: string, nivel: string, competenciaTecnica: string){
  let token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
    token
  });

  const url = URL_SERVICE.url + '/compTecObs/' + id;

  const grup = {
      descripcomportamientocion: comportamiento,
      empresa: this.idEmp,
      numero: numero,
      nivel: nivel,
      competenciaTecnica: competenciaTecnica
  };

  return this.http.put( url, grup, { headers} )
    .map((resp: any) =>
        resp
    );
}


delCtComportamiento(id: string){
  let token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
    token
  });

  const url = URL_SERVICE.url + '/compTecObs/' + id;


  return this.http.delete( url, { headers} )
    .map((resp: any) =>
        resp
    );
}

habCtComportamiento(id: string){
  let token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
    token
  });

  const url = URL_SERVICE.url + '/compTecObs/habilitar/' + id;


  return this.http.delete( url, { headers} )
    .map((resp: any) =>
        resp
    );
}
 
searchCtComportamiento(termino: string){
  let token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
    token
  });

  const url = URL_SERVICE.url + '/compTecObs/buscar/' + termino + "/" + this.idEmp;

  return this.http.get( url, {headers} )
              .map( (resp: any) =>
                  resp.compTecObs
              );
}


countCtComportamiento(){
  const token = localStorage.getItem('tokenFact');
  const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      token
  });

  const url = URL_SERVICE.url + '/compTecObs/contar/'+this.idEmp;


  return this.http.get( url, {headers} )
          .map( (resp: any) =>
              resp
          );
}


}
