import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CompCondPuestoService {

idEmp = localStorage.getItem('empresaFact');
  constructor(
    private http: HttpClient
    ) { }
  
    
    getCompCondPuesto(){
      console.log('entrooooo!!!')
      const token = localStorage.getItem('tokenFact');
      const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          token
      });
  
      const url = URL_SERVICE.url + '/compCondPuesto/'+this.idEmp;
  
  
      return this.http.get( url, {headers} )
              .map( (resp: any) =>
                  resp
              );
  }
  
  

  getBuscarCompCondPuestoPuesto(id: string,){
    console.log('entrooooo!!!')
    const token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        token
    });
  
    const url = URL_SERVICE.url + '/compCondPuestoB/'+this.idEmp+'/'+id;
  
  
    return this.http.get( url, {headers} )
            .map( (resp: any) =>
                resp
            );
  }
  




  agregarCompCondPuesto(puesto: string, compCondObs: string ) {
  
    console.log(puesto);
    const grup = {
      
      puesto: puesto,
      compCondObs:compCondObs,
      empresa: this.idEmp
  
    }
    const token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
           token
    });
    
    const url = URL_SERVICE.url + '/compCondPuesto';
  
    return this.http.post( url, grup, {headers} )
            .map( (resp: any) =>
                resp
            );
  }
  
  
  updCompCondPuesto(id: string, puesto: string, compCondObs: string){
    let token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
      token
    });
  
    const url = URL_SERVICE.url + '/compCondPuesto/' + id;
  
    const grup = {
        empresa: this.idEmp,
        puesto: puesto,
        compCondObs: compCondObs
    };
  
    return this.http.put( url, grup, { headers} )
      .map((resp: any) =>
          resp
      );
  }
  
  delCompCondPuesto(id: string){
    let token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
      token
    });
  
    const url = URL_SERVICE.url + '/compCondPuesto/' + id;
  
  
    return this.http.delete( url, { headers} )
      .map((resp: any) =>
          resp
      );
  }
  
  eliminarCompCondPuesto(id: string){
    let token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
      token
    });
  
    const url = URL_SERVICE.url + '/compCondPuestoDelete/' + id;
  
  
    return this.http.delete( url, { headers} )
      .map((resp: any) =>
          resp
      );
  }

  
  habCompCondPuesto(id: string){
    let token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
      token
    });
  
    const url = URL_SERVICE.url + '/compCondPuesto/habilitar/' + id;
  
  
    return this.http.delete( url, { headers} )
      .map((resp: any) =>
          resp
      );
  }
  
   
  searchCompCondPuesto(termino: string){
    let token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
      token
    });
  
    const url = URL_SERVICE.url + '/compCondPuesto/buscar/' + termino + "/" + this.idEmp;
  
    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.compCondPuesto
                );
  }
  
  
  countCompCondPuesto(){
    const token = localStorage.getItem('tokenFact');
    const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        token
    });
  
    const url = URL_SERVICE.url + '/compCondPuesto/contar/'+this.idEmp;
  
  
    return this.http.get( url, {headers} )
            .map( (resp: any) =>
                resp
            );
  }
  
  
  }
  