import { Component, OnInit, ViewChild } from '@angular/core';
import { CompetenciaConductual } from '../../models/competenciaConductual.models';
import { Puesto } from '../../models/puesto.models';
import { Usuario } from '../../models/usuario.model';
import { PuestoService } from '../../services/puesto.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompCondPuesto } from '../../models/compCondPuesto';
import { CompetenciaConductualService } from '../../services/competencia-conductual.service';
import { CompCondPuestoService } from '../../services/comp-cond-puesto.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comp-cond-puesto',
  templateUrl: './comp-cond-puesto.component.html',
  styleUrls: ['./comp-cond-puesto.component.css']
})
export class CompCondPuestoComponent implements OnInit {


  compCondObs: string = "";
  competenciaConductual: string = "";

  compCondObsU: string = "";
  competenciaConductualU: string = "";

  buscarCompCondPuesto: string = "";
  contComCondPuesto: string = "";
  getDataCompCondPusto: CompCondPuesto;
  dataUpdCompCondPusto:Boolean= false;
  coincidencia:Boolean= true;
  compCondPuestos:CompCondPuesto[] = [];
  puestos:Puesto[] = [];
  competenciasConductuales: CompetenciaConductual[] = [];
  empRol: Usuario;
  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;
  @ViewChild('closebuttonupd',  {static: false}) closebuttonupd;
 constructor(
  public _puesto: PuestoService,
  public _compCond: CompetenciaConductualService,
  public _compCondPuesto: CompCondPuestoService,
  public router:Router,
  public toastr: ToastrService, 
  ) { }

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
    this.getCompCondPuesto();
    this.getPuesto();
    this.getCompetenciaConductual();
    this.ContarComCondPuesto();

  }

    ContarComCondPuesto(){
      this._compCondPuesto.countCompCondPuesto().subscribe(resp=>{
        this.contComCondPuesto = resp.total;
      })
    }
  
    getCompetenciaConductual(){
      this._compCond.getCompetenciaConductual().subscribe(resp => {
        console.log(resp);
        this.competenciasConductuales = resp.competenciaConductual;
      })
    }
  getPuesto(){
    this._puesto.getPuesto().subscribe(resp => {
      console.log(resp);
      this.puestos = resp.puesto;
    })
  }
  
  getCompCondPuesto(){
    this._compCondPuesto.getCompCondPuesto().subscribe(resp => {
      console.log(resp);
      this.compCondPuestos = resp.compCondPuesto;
    })
  }
  
  
  
  addCompCondPuestos(compCondPuesto:NgForm){
    for (let i = 0; i < this.compCondPuestos.length; i++) {
   if (compCondPuesto.value.compCondObs === this.compCondPuestos[i].puesto) {
    
    Swal.fire({
      title: 'ya exise la actividad esencial!',
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
  this._compCondPuesto.agregarCompCondPuesto(
    compCondPuesto.value.compCondObs, 
    compCondPuesto.value.competenciaConductual)
                        .subscribe(resp => {
  
  console.log(resp);
   this.getCompCondPuesto();
   this.ContarComCondPuesto();
   this.closebuttonadd.nativeElement.click();
   this.toastr.success('Agregado Correctamente', 'Correcto');
  })
  }
  
  getDataCompCondPuesto(compCondPuesto: CompCondPuesto){
  this.getDataCompCondPusto = compCondPuesto;
  this.compCondObsU = compCondPuesto.puesto
  this.competenciaConductualU = compCondPuesto.compCondObs
  this.dataUpdCompCondPusto = true;
  }  
  
  
  updCompCondPuestos(form: NgForm){
    console.log(form.value);
        this._compCondPuesto.updCompCondPuesto(
                                            this.getDataCompCondPusto._id, 
                                            form.value.compCondObsU, 
                                            form.value.competenciaConductualU)
                                                      .subscribe(correcto => {
          this.getCompCondPuesto();
           this.closebuttonupd.nativeElement.click();
           this.toastr.success('Modificado Correctamente', 'Correcto');
        });
      }
  
      
      eliminarCompCondPuesto(form:CompCondPuesto){
        Swal.fire({icon: 'error',
        title: "¿Seguro desea eliminar ? ",
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
          this._compCondPuesto.delCompCondPuesto(form._id).subscribe(resp =>{
           this.getCompCondPuesto();
           this.ContarComCondPuesto();
           this.toastr.success('Eliminado Correctamente', 'Correcto');
         })
          } 
        })
        
        }
        
          
        habilitarCompCondPuesto(form: CompCondPuesto){
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
            this._compCondPuesto.habCompCondPuesto(form._id).subscribe(resp =>{
              this.getCompCondPuesto();
              this.ContarComCondPuesto();
              this.toastr.success('Habilitado Correctamente', 'Correcto');
            })
          }
        })
        }
  
        searchCompCondPuesto(buscar: NgForm){
          console.log("entrooo");
          if(buscar.value.buscarCompCondPuesto == "" ){
            this.coincidencia = true;
            this.getCompCondPuesto();
          }else{
            this._compCondPuesto.searchCompCondPuesto(buscar.value.buscarCompCondPuesto).subscribe(correcto => {
              console.log(correcto);
              if(correcto.length === 0 || correcto.length == null ){
                  this.coincidencia = false;
                  return;
              }else{
                this.coincidencia = true;
                this.compCondPuestos = correcto;
              }
            });
          }
        }
  
  }
  