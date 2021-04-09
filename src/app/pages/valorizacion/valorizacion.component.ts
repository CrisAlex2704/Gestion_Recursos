import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ValorizacionService } from '../../services/valorizacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Valorizacion } from '../../models/valorizacion.models';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PuestoService } from 'src/app/services/puesto.service';
import { UpdPuestoService } from 'src/app/services/upd-puesto.service';
import { Puesto } from 'src/app/models/puesto.models';
import { DescValService } from 'src/app/services/desc-val.service';
import { DescVal } from 'src/app/models/descVal.models';
import { GrupoOcupacionalService } from 'src/app/services/grupo-ocupacional.service';
import { GrupoOcupacional } from 'src/app/models/grupoOcupacional.models';
import { DetalleValorizacionService } from '../../services/detalle-valorizacion.service';


@Component({
  selector: 'app-valorizacion',
  templateUrl: './valorizacion.component.html',
  styleUrls: ['./valorizacion.component.css']
})
export class ValorizacionComponent implements OnInit {
  valorizaciones: Valorizacion[] = []; 
  descvalorizaciones: DescVal[] = [];
  gruposOcupacionales:GrupoOcupacional[] = [];

  listaTitulo: DescVal[] = [];
  

  contVal: String = "";
  puesto: String = "";
  descVal: String = "";
  total: String = "";
  puestoU: String = "";
  descValU: String = "";
  totalU: String = "";
  getDataVal: Valorizacion;
  getDatadesVal: DescVal;
  dataUpdVal: Boolean = false;
  coincidencia: Boolean = false;
  buscarVal: String = "";
  empRol: Usuario;
  idModificar: string = "";

  getDataPuest: Puesto;
  dataUpdPuest: boolean = false;
  codigoPuest: string = "";
  denominacionPuest: string = "";
  misionPuest: string = "";
  nivelPuest: string = "";
  unidadAdminPuest: string = "";
  RIEPuest: string = "";
  capacitacionPuest: string = "";
  rolPuest: string = "";
  grupoOcupacionalPuest: string = "";
  ambitoPuest: string = ""
  gradoPuest: string = "";


  descripcion: string = "";
  observacion: string = "";
  calificacion: string = "";
  subtitulo: string = "";
  titulo: string = "";

  getDataGrup: GrupoOcupacional;
  desGrupU: string;
  minGrupU: string;
  maxGrupU: string;
  dataUpdGrup:Boolean= false;
  tituloVal: string= "";
  grupo: GrupoOcupacional;

  index:number = 1;
  cargaDatos = false;

  valor21: number = 0;
  valor22: number = 0;
  valor23: number = 0;
  valor24: number = 0;
  valor31: number = 0;
  valor32: number = 0;
  valor41: number = 0;
  valor42: number = 0;

  id21: string= "";
  id22: string= "";
  id23: string= "";
  id24: string= "";
  id31: string= "";
  id32: string= "";
  id41: string= "";
  id42: string= "";

  totalPuesto: number = 0;


  @ViewChild('closebuttonadd', { static: false }) closebuttonadd;
  @ViewChild('closebuttonupd', { static: false }) closebuttonupd;

  constructor(
    public _grupoOcupacional: GrupoOcupacionalService,
    public _updPuesto: UpdPuestoService,
    public _puesto: PuestoService,
    public _descvalorizacion: DescValService,
    public ruta: ActivatedRoute,
    public _valorizacion: ValorizacionService,
    public _detallevalorizacion: DetalleValorizacionService,
    public router: Router,
    public toastr: ToastrService,
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

    this.getdescValorizacion();
    this.getValorizacion();
    this.ContarValoriacion();
    this.listapuesto();
    this.getGrupoOcupacional(153)
  }

  getValorizacion() {
    this._valorizacion.getValorizacion().subscribe(resp => {
      console.log(resp);
      this.valorizaciones = resp.valorizacion;
    })
  }

  
  Carga() {
    this.router.navigate(['/Valorizacion/'+this.idModificar])
      .then(() => {
        window.location.reload();
      })
  }

  ContarValoriacion() {
    this._valorizacion.countVal().subscribe(resp => {
      this.contVal = resp.total;
    })
  }


  addValorizacion() {
    this._valorizacion.agregarValorizacion(
      this.idModificar,
      this.totalPuesto).subscribe(resp => {

      this.adddetalleValorizacion(this.id21,resp.valorizacion._id);
      this.adddetalleValorizacion(this.id22,resp.valorizacion._id);
      this.adddetalleValorizacion(this.id23,resp.valorizacion._id);
      this.adddetalleValorizacion(this.id24,resp.valorizacion._id);
      this.adddetalleValorizacion(this.id31,resp.valorizacion._id);
      this.adddetalleValorizacion(this.id32,resp.valorizacion._id);
      this.adddetalleValorizacion(this.id41,resp.valorizacion._id);
      this.adddetalleValorizacion(this.id42,resp.valorizacion._id); 
        console.log(resp);
        console.log(this.id21);
        this.getValorizacion();
        this.ContarValoriacion();
        this.toastr.success('Agregado Correctamente', 'Correcto');
      })
  }

  adddetalleValorizacion(id: string, valor:string){
    this._detallevalorizacion.agregarDetalleValorizacion(id,valor).subscribe(resp=>{
      console.log(resp);
    })
  }
  
  getDataActividadPuesto(valorizacion: Valorizacion) {
    this.getDataVal = valorizacion;
    this.puestoU = valorizacion.puesto;
    this.totalU = valorizacion.total;
    this.dataUpdVal = true;
  }

  updValorizacion(form: NgForm) {
    console.log(form.value);
    this._valorizacion.updValorizacion(this.getDataVal._id, form.value.descValU).subscribe(correcto => {
      this.getValorizacion();
      this.closebuttonupd.nativeElement.click();
      this.toastr.success('Modificado Correctamente', 'Correcto');
    });
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


  listapuesto() {
    this._updPuesto.getlistaPuestos(this.idModificar).subscribe(resp => {
      if (resp.ok == true) {
        this.getDataPuesto(resp.actividadCargo[0].puesto);
        console.log(resp.actividadCargo[0].puesto);
      }
    })
  }
  
  getDataPuesto(puesto: Puesto) {
    this.getDataPuest = puesto;
    this.codigoPuest = puesto.codigo;
    this.denominacionPuest = puesto.denominacion;
    this.misionPuest = puesto.mision;
    this.nivelPuest = puesto.nivel;
    this.unidadAdminPuest = puesto.unidadAdmin;
    this.RIEPuest = puesto.RIE;
    this.capacitacionPuest = puesto.capacitacion;
    this.rolPuest = puesto.rol;
    this.gradoPuest = puesto.grado;
    this.grupoOcupacionalPuest = puesto.grupoOcupacional;
    this.ambitoPuest = puesto.ambito;
    this.dataUpdPuest = true;
  }

  getdescValorizacion() {
    this._descvalorizacion.getDescValorizacion().subscribe(resp => {
      console.log(resp);
      this.descvalorizaciones = resp.descval;
      this.cambioIndex(1,1);
    })
  }


  getDataDescVal(valorizacion: DescVal) {
    this.getDatadesVal = valorizacion;
    this.descripcion = valorizacion.descripcion
    this.observacion = valorizacion.observacion
    this.calificacion = valorizacion.calificacion
    this.subtitulo = valorizacion.subtitulo
    this.titulo = valorizacion.titulo
    this.dataUpdVal = true;

  }

  cambioIndex( opcion: number, ind?: number){

    console.log("entro 1");
console.log(opcion + " "+ ind);
    if(opcion == 1){
      this.index = ind;
    }else if(opcion == 2){

      this.index = this.index+1;
  
    }else{
      this.index = this.index-1;
    }
    console.log("entro 2");  
    
    if(this.index === 1 ){
      this.tituloVal = "  2.1. INSTRUCCIÓN FORMACIÓN";
    }else if(this.index === 2 ){
      this.tituloVal = "  2.2.  EXPERIENCIA";
    }else if(this.index === 3 ){
      this.tituloVal = "  2.3. HABILIDAD DE GESTIÓN ";
    }else if(this.index === 4 ){
      this.tituloVal = "  2.4.  HABILIDAD DE COMUNICACIÓN";
    }else if(this.index === 5 ){
      this.tituloVal = " 3.1. CONDICIONES DE TRABAJO";
    }else if(this.index === 6 ){
      this.tituloVal = "  3.2.  TOMA DE DECISIONES";
    }else if(this.index === 7 ){
      this.tituloVal = "  4.1. ROL DEL PUESTO";
    }else if(this.index === 8 ){
      this.tituloVal = "  4.2. CONTROL DE RESULTADOS";
    }
    console.log(this.tituloVal);
    this.getTitulo(this.tituloVal);
   
  }

  getTitulo(titulo: string){

    let cont = 0;
    this.listaTitulo = [];
    console.log(this.descvalorizaciones.length);
    for (let i = 0; i < this.descvalorizaciones.length; i++) {
      console.log(this.descvalorizaciones[i].titulo);
      if(this.descvalorizaciones[i].titulo == titulo){

        this.listaTitulo[cont] = this.descvalorizaciones[i];
        cont = cont+1;
      }
      
    }
    this.cargaDatos = true;
  }

  setvalor21(valor: number, id: string){
   this.valor21 = valor;
   this.id21 = id;
   this.calcularTotal(1);
  }
  setvalor22(valor: number, id: string){
    this.valor22 = valor;
    this.id22 = id;
   this.calcularTotal(1);
  }
  setvalor23(valor: number, id: string){
    this.valor23 = valor;
    this.id23 = id;
   this.calcularTotal(1);
  }
  setvalor24(valor: number, id: string){
    this.valor24 = valor;
    this.id24 = id;
    this.calcularTotal(1);
  }
  setvalor31(valor: number, id: string){
    this.valor31=valor;
    this.id31 = id;
    this.calcularTotal(1);
  }
  setvalor32(valor: number, id: string){
    this.valor32 = valor;
    this.id32 = id;
    this.calcularTotal(1);
  }
  setvalor41(valor: number, id: string){
    this.valor41 = valor;
    this.id41 = id;
    this.calcularTotal(1);
  }
  setvalor42(valor: number, id: string){
    this.valor42 = valor;
    this.id42 = id;
    this.calcularTotal(1);
  }

  calcularTotal(opcion){

if (opcion == 1) {


    this.totalPuesto =  Number(this.valor21) + Number(this.valor22) + Number(this.valor23) + Number(this.valor24) +Number(this.valor31) + Number(this.valor32) +Number(this.valor41) + Number(this.valor42);  
    console.log(this.totalPuesto);  
    this.getGrupoOcupacional(this.totalPuesto);
}else {
  this.totalPuesto =  Number(this.valor21) + Number(this.valor22) + Number(this.valor23) + Number(this.valor24) +Number(this.valor31) + Number(this.valor32) +Number(this.valor41) + Number(this.valor42);  
  console.log(this.totalPuesto);  
  this.getGrupoOcupacional(this.totalPuesto);
  this.addValorizacion();
}
     
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
}
