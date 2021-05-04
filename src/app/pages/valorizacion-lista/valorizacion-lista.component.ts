import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GrupoOcupacional } from 'src/app/models/grupoOcupacional.models';
import { Usuario } from 'src/app/models/usuario.model';
import { Valorizacion } from 'src/app/models/valorizacion.models';
import { ValorizacionService } from 'src/app/services/valorizacion.service';
import { GrupoOcupacionalService } from '../../../../../frontend1/src/app/services/grupo-ocupacional.service';
import { DetalleValorizacionService } from '../../services/detalle-valorizacion.service';
import { DetalleValorizacion } from '../../models/detalleValorizacion';
import { UpdPuestoService } from 'src/app/services/upd-puesto.service';
import { URL_SERVICE } from 'src/app/config/config';

@Component({
  selector: 'app-valorizacion-lista',
  templateUrl: './valorizacion-lista.component.html',
  styleUrls: ['./valorizacion-lista.component.css']
})
export class ValorizacionListaComponent implements OnInit {

  idEmp = localStorage.getItem('empresaFact');
  
  contVal: String = "";
  puesto: String = "";
  total: String = "";
  getDataVal: Valorizacion;
  dataUpdVal: Boolean = false;
  coincidencia: Boolean = true;
  buscarVal: string = "";

  getDataGrup: GrupoOcupacional;
  desGrupU: string;
  minGrupU: string;
  maxGrupU: string;
  dataUpdGrup:Boolean= false;
  grupo: GrupoOcupacional;

  getDataDetalleVal: DetalleValorizacion;
  descVal:string;
  valorizacion: string;
  dataUpdDetalleVal:Boolean= false;

  empRol: Usuario;
  valorizaciones: Valorizacion[] = [];
  gruposOcupacionales:GrupoOcupacional[] = []; 
  detallevalorizaciones: DetalleValorizacion[] = [];

  idModificar: string = "";

  totales:string[] = [];
  @ViewChild('closebuttonadd', { static: false }) closebuttonadd;
  @ViewChild('closebuttonupd', { static: false }) closebuttonupd;

  constructor(
    
    public router: Router,
    public toastr: ToastrService,
    public _valorizacion: ValorizacionService,
    public _grupoOcupacional: GrupoOcupacionalService,
    public _detalleValorizacion: DetalleValorizacionService,
    public _updPuesto: UpdPuestoService,
    public ruta: ActivatedRoute,
  ) {
    this.idModificar = this.ruta.snapshot.paramMap.get("idpuesto");
   }

  ngOnInit(): void {

    if (localStorage.getItem('tokenFact') == null) {
      this.router.navigate(['/login'])
        .then(() => {
          window.location.reload();
        });
    }

    this.empRol = JSON.parse(localStorage.getItem('empFact'));

    if (this.empRol.rol != "Administrador") {
      this.router.navigate(['/login']);
      return;
    }

    this.ContarValoriacion();
    this.getValorizacion();
  
  }

  getValorizacion() {
    this._valorizacion.getValorizacion().subscribe(resp => {
      console.log(resp);
      this.valorizaciones = resp.valorizacion;
      for (let j = 0; j  < resp.valorizacion.length; j++) {
        
        this._grupoOcupacional.getGrupoOcupacional().subscribe(resp => {
          console.log(resp);
          this.gruposOcupacionales = resp.grupoOcp;
          console.log(this.gruposOcupacionales);
          for (let i = 0; i < this.gruposOcupacionales.length; i++) {
            if (this.valorizaciones[j].total >= this.gruposOcupacionales[i].minVal && this.valorizaciones[j].total <= this.gruposOcupacionales[i].maxVal) {
            this.totales[j] = this.gruposOcupacionales[i].descripcion;
             
            }
            
          }
        })
        
      }
     
    })
  }

  getDataValorizacion(valorizacion: Valorizacion) {
    this.getDataVal = valorizacion;
    this.puesto = valorizacion.puesto;
    this.total = valorizacion.total;
    this.dataUpdVal = true;
  }

  searchVal(buscar: NgForm) {
    console.log("entrooo");
    if (buscar.value.buscarVal == "") {
      this.coincidencia = true;
      this.getValorizacion();
    } else {
      this._valorizacion.searchVal(buscar.value.buscarVal).subscribe(correcto => {
        if (correcto.length === 0) {
          this.coincidencia = false;
          return;
        } else {
          this.coincidencia = true;
          this.valorizaciones = correcto;
        }
      });
    }
  }

  ContarValoriacion() {
    this._valorizacion.countVal().subscribe(resp => {
      this.contVal = resp.total;
    })
  }

  

getGrupoOcupacional(total){
  this._grupoOcupacional.getGrupoOcupacional().subscribe(resp => {
    console.log(resp);
    this.gruposOcupacionales = resp.grupoOcp;
    console.log(this.gruposOcupacionales);
    for (let i = 0; i < this.gruposOcupacionales.length; i++) {
      if (total >= this.gruposOcupacionales[i].minVal && total<= this.gruposOcupacionales[i].maxVal) {
      this.grupo = this.gruposOcupacionales[i];
      console.log(this.grupo);  

      }
      
    }
  })
}

getDataGrupoOcupacional(grupoOcupacional: GrupoOcupacional){
  this.getDataGrup = grupoOcupacional;
  this.desGrupU = grupoOcupacional.descripcion;
  this.minGrupU = grupoOcupacional.minVal;
  this.maxGrupU = grupoOcupacional.maxVal;
  this.dataUpdGrup = true;
}

getdetalleValorizacion(id: string) {
  this._detalleValorizacion.getDetalleValorizacion(id).subscribe(resp => {
    this.detallevalorizaciones = resp.detallevalorizacion;
    console.log(this.detallevalorizaciones);
  })
}

getDataDetalleValorizacion(detallevalorizacion: DetalleValorizacion) {
  this.getDataDetalleVal = detallevalorizacion;
  this.descVal = detallevalorizacion.descval;
  this.valorizacion = detallevalorizacion.valorizacion;
  this.dataUpdDetalleVal = true;
}


generarpdf(id: string) {
  console.log(id);
  this._updPuesto.generarPDFVal(id).subscribe(resp => {
    console.log(resp);
    if (resp.ok == true) {
      console.log(resp);
      let filename = URL_SERVICE.url + "/getpdf/" + this.idEmp + "_ficahtecnica" + id + ".pdf";
      window.open(filename);
    }
  })
}
}


