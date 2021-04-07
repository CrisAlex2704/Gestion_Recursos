import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { PuestoService } from 'src/app/services/puesto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Puesto } from '../../models/puesto.models';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Rol } from '../../models/rol.models';
import { RolService } from '../../services/rol.service';
import { Ambito } from '../../models/ambito.models';
import { AmbitoService } from '../../services/ambito.service';
import { CompCondObs } from '../../models/compCondObs.models';
import { CccomportamientoObsService } from '../../services/cccomportamiento-obs.service';
import { CompTecObs } from '../../models/compTecObs.models';
import { CTcomportamientoObsService } from '../../services/ctcomportamiento-obs.service';
import { URL_SERVICE } from 'src/app/config/config';
import { UpdPuestoService } from 'src/app/services/upd-puesto.service';

@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.component.html',
  styleUrls: ['./puesto.component.css']
})
export class PuestoComponent implements OnInit {
  puestos:Puesto[] = [];
  roles:Rol[] = [];
  ambitos:Ambito[] = [];
  empRol: Usuario;
  idEmp = localStorage.getItem('empresaFact');

  
 
  codigoPuest: String = "";
  denominacionPuest: String = "";
  misionPuest: String = "";
  nivelPuest: String = "";
  unidadAdminPuest: String = "";
  RIEPuest: String = "";
  capacitacionPuest: String = "";
  rolPuest: String = "";
  grupoOcupacionalPuest: String = "";
  ambitoPuest: String = ""
  // compeCondObs: String = "";
  // compeTecObs: String = "";
  gradoPuest: String = "";

  // compeCondObsU: String = "";
  // compeTecObsU: String = "";
  codigoPuestU: String = "";
  denominacionPuestU: String = "";
  misionPuestU: String = "";
  nivelPuestU: String = "";
  unidadAdminPuestU: String = "";
  RIEPuestU: String = "";
  capacitacionPuestU: String = "";
  rolPuestU: String = "";
  grupoOcupacionalPuestU: String = "";
  ambitoPuestU: String = ""
  gradoPuestU: String = "";

  getDataPuest: Puesto;
  dataUpdPuest:boolean= false;
  coincidencia:boolean= true;
  buscarPuest: string = "";
  contPuest: string = "";
  rol : Rol[] = [];
  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;
   @ViewChild('closebuttonupd',  {static: false}) closebuttonupd;
  constructor(
    public _puesto: PuestoService,
    public _rol: RolService,
    public _ambito: AmbitoService,
    public router:Router,
    public toastr: ToastrService,
    public _updPuesto: UpdPuestoService,
    public ruta:ActivatedRoute,
  ) { 
  }

  ngOnInit(): void {
    if(localStorage.getItem('tokenFact') == null){
      this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
    }

    this.empRol = JSON.parse(localStorage.getItem('empFact'));

    if(this.empRol.rol != "Administrador"){
      this.router.navigate(['/login']);
      return;
    }
    this.getPuesto();
    this.getRol();
    this.getAmbito();
    this.ContarPuestos();
  }

  getPuesto(){
    this._puesto.getPuesto().subscribe(resp => {
      console.log(resp);
      this.puestos = resp.puesto;
    
    })
  }
  getRol(){
    this._rol.getRol().subscribe(resp => {
      console.log(resp);
      this.roles = resp.rol;
    })
  }
  getAmbito(){
    this._ambito.getAmbito().subscribe(resp => {
      console.log(resp);
      this.ambitos = resp.ambito;
    })
  }



  getRolId(IdR:string):Rol[] {
   
    console.log(IdR);
    
    this._puesto.getRolID(IdR).subscribe(resp => {
      
      this.rol = resp.rol;
      console.log(this.rol);
      // this.puestos = resp.puestos;
    }, (err) => {
      console.log(err);
    })
    return this.rol;
  }


  getAmbitoId(IdA:string):Ambito {
    let ambito : Ambito;

    this._puesto.getAmbID(IdA).subscribe(resp => {
      console.log(resp);
      ambito = resp.ambito[0];
      // this.puestos = resp.puestos;
    })
    return ambito;
  }

  modificarP(idP){
    this.router.navigate(['/updPuesto/'+idP]);
  }

  CalificarP(idP){
    this.router.navigate(['/Valorizacion/'+idP]);
  }
  
  
  Carga(){
    this.router.navigate(['/addpuesto'])
  .then(()=> {
    window.location.reload();
  })
  }

  addPuestos(puesto:NgForm){
    for (let i = 0; i < this.puestos.length; i++) {
   if (puesto.value.desGrup === this.puestos[i].denominacion) {
    Swal.fire({
      title: 'ya exise el Puesto!',
       icon: 'error',
       showCancelButton: true,
       confirmButtonColor: '#23CCEF',
       cancelButtonColor: '#d33',
       cancelButtonText: 'Cancelar',
       confirmButtonText: 'Confirmar',
       width: '450px',
       heightAuto: true,
       showClass: {
         popup: 'animated fadeInDown faster'
       },
       hideClass: {
         popup: 'animated fadeOutUp faster'
       }
     });
     return;
   }
 }
 this._puesto.agregarPuesto(
                            puesto.value.codigoPuest,
                            puesto.value.denominacionPuest,
                            puesto.value.misionPuest,
                            puesto.value.nivelPuest,
                            puesto.value.unidadAdminPuest,
                            puesto.value.RIEPuest,
                            puesto.value.capacitacionPuest,
                            puesto.value.rolPuest,

                            puesto.value.gradoPuest,
                            
                            puesto.value.grupoOcupacionalPuest,
                            puesto.value.ambitoPuest)
                                                    .subscribe(resp => {
                                                    console.log(resp);
                                                    this.getPuesto();
                                                    this.ContarPuestos();
                                                    this.closebuttonadd.nativeElement.click();
                                                    this.toastr.success('Agregado Correctamente', 'Correcto');
 })
}

getDataPuesto(puesto: Puesto){
 this.getDataPuest = puesto;

 this.codigoPuestU = puesto.codigo;
 this.denominacionPuestU = puesto.denominacion;
 this.misionPuestU = puesto.mision;
 this.nivelPuestU = puesto.nivel;
 this.unidadAdminPuestU = puesto.unidadAdmin;
 this.RIEPuestU = puesto.RIE;
 this.capacitacionPuestU = puesto.capacitacion;
 this.rolPuestU = puesto.rol;
 this.gradoPuestU = puesto.grado;
 this.grupoOcupacionalPuestU = puesto.grupoOcupacional;
 this.ambitoPuestU = puesto.ambito;
 this.dataUpdPuest = true;
}


updPuestos(form: NgForm){
  console.log(form.value);
      this._puesto.updPuesto(
                            form.value.codigoPuestU,
                            form.value.denominacionPuestU,
                            form.value.misionPuestU,
                            form.value.nivelPuestU,
                            form.value.unidadAdminPuestU,
                            form.value.RIEPuestU,
                            form.value.capacitacionPuestU,
                            form.value.rolPuestU,
                            form.value.gradoPuestU,
                            form.value.grupoOcupacionalPuestU,
                            form.value.ambitoPuestU,
                            this.getDataPuest._id).subscribe(correcto => {
        this.getPuesto();
         this.closebuttonupd.nativeElement.click();
         this.toastr.success('Modificado Correctamente', 'Correcto');
      });
    }

  eliminarPuesto(form:Puesto){
    Swal.fire({icon: 'error',
    title: "¿Seguro desea eliminar a " + form.denominacion + "?",
    showCancelButton: true,
    confirmButtonColor: '#23CCEF',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Confirmar',
    width: '450px',
    heightAuto: true,
    showClass: {
      popup: 'animated fadeInDown faster'
    },
    hideClass: {
      popup: 'animated fadeOutUp faster'
    }
    }).then((result) => {
      if (result.value) {
      this._puesto.delPuest(form._id).subscribe(resp =>{
       this.getPuesto();
       this.ContarPuestos();
       this.toastr.success('Eliminado Correctamente', 'Correcto');
     })
      } 
    })
    
    }
     
    habilitarPuesto(form: Puesto){
    Swal.fire({
      icon: 'error',
      title: "¿Seguro desea habilitar",
      showCancelButton: true,
      confirmButtonColor: '#23CCEF',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      width: '450px',
      heightAuto: true,
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    }).then((result) => {
      if (result.value) {
        this._puesto.habPuest(form._id).subscribe(resp =>{
          this.getPuesto();
          this.ContarPuestos();
          this.toastr.success('Habilitado Correctamente', 'Correcto');
        })
      }
    })
    }

    
searchPuesto(buscar: NgForm){
  console.log("entrooo");
  if(buscar.value.buscarPuest == "" ){
    this.coincidencia = true;
    this.getPuesto();
  }else{
    this._puesto.searchPuest(buscar.value.buscarPuest).subscribe(correcto => {
      if(correcto.length === 0 ){
          this.coincidencia = false;
          return;
      }else{
        this.coincidencia = true;
        this.puestos = correcto;
      }
    });
  }
}

ContarPuestos(){
  this._puesto.countPuest().subscribe(resp=>{
    this.contPuest = resp.total;
  })
}


generarpdf(form: Puesto){
  
      let filename = URL_SERVICE.url + "/getpdf/" +this.idEmp+ "_puesto"+form.denominacion+".pdf"; 
   
      console.log(filename);
      window.open(filename);
  

 
 }

}

