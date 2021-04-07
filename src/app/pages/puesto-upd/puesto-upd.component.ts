import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UpdPuestoService } from 'src/app/services/upd-puesto.service';
import { NgForm } from '@angular/forms';
import { PuestoService } from 'src/app/services/puesto.service';
import { RolService } from 'src/app/services/rol.service';
import { AmbitoService } from 'src/app/services/ambito.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { ExperienciaPuestoService } from 'src/app/services/experiencia-puesto.service';
import { ConocimientoAdicionalService } from 'src/app/services/conocimiento-adicional.service';
import { ActividadEsencialService } from 'src/app/services/actividad-esencial.service';
import { ActividadCargoService } from 'src/app/services/actividad-cargo.service';
import { CompetenciaTecnicaService } from 'src/app/services/competencia-tecnica.service';
import { CTcomportamientoObsService } from 'src/app/services/ctcomportamiento-obs.service';
import { CccomportamientoObsService } from 'src/app/services/cccomportamiento-obs.service';
import { CompTecPuestoService } from 'src/app/services/comp-tec-puesto.service';
import { CompetenciaConductualService } from 'src/app/services/competencia-conductual.service';
import { CompCondPuestoService } from 'src/app/services/comp-cond-puesto.service';
import { ToastrService } from 'ngx-toastr';
import { Puesto } from 'src/app/models/puesto.models';
import { Rol } from 'src/app/models/rol.models';
import { Ambito } from 'src/app/models/ambito.models';
import { ActividadCargo } from 'src/app/models/actividadCargo.models';
import { ExperienciaPuesto } from 'src/app/models/expPuesto.models';
import { Experiencia } from 'src/app/models/experiencia.models';
import { ConocimientoAdicional } from 'src/app/models/conocimientoAdicional.models';
import { CompetenciaTecnica } from 'src/app/models/competenciaTecnica.models';
import { CompTecObs } from 'src/app/models/compTecObs.models';
import { CompTecPuesto } from 'src/app/models/compTecPuesto';
import { CompetenciaConductual } from 'src/app/models/competenciaConductual.models';
import { CompCondObs } from 'src/app/models/compCondObs.models';
import { CompCondPuesto } from 'src/app/models/compCondPuesto';
import { ActividadEsencial } from 'src/app/models/actividadEsencial.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puesto-upd',
  templateUrl: './puesto-upd.component.html',
  styleUrls: ['./puesto-upd.component.css']
})
export class PuestoUpdComponent implements OnInit {

  empRol: Usuario;
  idModificar: string = "";

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

  desActCargU: String = "";
  frActCargU: String = "";
  coActCargU: String = "";
  cmActCargU: String = "";
  totalActCargU: String = "";
  puestoActCargU: String = "";
  getDataActCarg: ActividadCargo;
  dataUpdActCarg: Boolean = false;

  idRol: string;
  descRol: string;
  idAmb: string;
  descAmb: string;
  idExp: string;
  descExp: string;
  idExp1: string;
  descExp1: string;
  idExp2: string;
  descExp2: string;
  descExpU: string;
  descExp1U: string;
  descExp2U: string;
  areaExpU1: string = "";
  especificidadExp: String = "";

  puestos: Puesto[] = [];
  roles: Rol[] = [];
  ambitos: Ambito[] = [];
  actividadesCargos: ActividadCargo[] = [];
  experienciasPuestos: ExperienciaPuesto[] = [];
  experienciasPuestosb: ExperienciaPuesto[] = [];
  expPuesto: ExperienciaPuesto[] = [];
  Arrayexperiencias: Experiencia[] = [];
  conocimientos: ConocimientoAdicional[] = [];
  competenciasTecnicas: CompetenciaTecnica[] = [];
  ctcomportamientos: CompTecObs[] = [];
  compTecPuestos: CompTecPuesto[] = [];
  compCondPuestos: CompCondPuesto[] = [];
  competenciasConductuales: CompetenciaConductual[] = [];
  cccomportamientos: CompCondObs[] = [];
  experiencias: Experiencia[] = [];
  experiencias1: Experiencia[] = [];
  experiencias2: Experiencia[] = [];
  ArrayActEse: string[] = [];
  ArrayComplemento: string[] = [];
  ArrayExperiencia: string[] = [];
  competenciaTecnical: CompetenciaTecnica[] = [];
  compTc: CompTecPuesto[] = [];
  compCd: CompCondPuesto[] = [];
  actividadesEsenciales: ActividadEsencial[] = [];
  rol: Rol[] = [];
  ambito: Ambito[] = [];

  tiempoExp: String = "";
  tiempoExp1: String = "";
  tiempoExp2: String = "";
  idupdExpPuest: string[] = [];
  nivel: string[] = [];

  getDataPuest: Puesto;
  getDataExpPuest: ExperienciaPuesto;
  dataUpdPuest: boolean = false;
  coincidencia: boolean = true;

  desActCarg: String = "";
  totalActCarg: number = 0;
  frActCarg: number = 0;
  coActCarg: number = 0;
  cmActCarg: number = 0;
  modalupd: boolean = false;
  posicion: String = "";
  competenciaCt: string = "";
  competenciaCc: string = "";


  prueba: ActividadCargo[] = [];
  actCargo: ActividadCargo[] = [];
  actEsenc: ActividadEsencial[] = [];
  expe: ExperienciaPuesto[] = [];
  temp: number[] = [];
  conoc: ConocimientoAdicional[] = [];
  nuevoConoc: ActividadEsencial[] = [];

  @ViewChild('closebuttonadd', { static: false }) closebuttonadd;
  constructor(
    public router: Router,
    public _updPuesto: UpdPuestoService,
    public ruta: ActivatedRoute,
    public _puesto: PuestoService,
    public _rol: RolService,
    public _ambito: AmbitoService,
    public _experiencia: ExperienciaService,
    public _exepienciaPuesto: ExperienciaPuestoService,
    public _conocimiento: ConocimientoAdicionalService,
    public _actividadEsencial: ActividadEsencialService,
    public _activdadCargo: ActividadCargoService,
    public _competenciaTecnica: CompetenciaTecnicaService,
    public _ctcomportamiento: CTcomportamientoObsService,
    public _cccomportamiento: CccomportamientoObsService,
    public _compTecPuesto: CompTecPuestoService,
    public _compCond: CompetenciaConductualService,
    public _compCondPuesto: CompCondPuestoService,
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

    this.listapuesto();
    this.getCompetenciaTecnica();
    this.getCompetenciaConductual();



  }

  listapuesto() {
    this._updPuesto.getlistaPuestos(this.idModificar).subscribe(resp => {
      if (resp.ok == true) {
        this.getDataPuesto(resp.actividadCargo[0].puesto);
        this.getDataActividadCargo(resp.actividadCargo);
        this.getDataConocimeinto(resp.actividadEsencial);
        this.getDataCompTec(resp.compTecPuesto);
        this.getDataCompCond(resp.compCondPuesto);
        this.getDataExp(resp.expPuesto);
        this.getExperiencia();
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
    this.getRolId(this.rolPuest['_id']);
    this.getAmbitoId(this.ambitoPuest['_id']);
    this.getRol();
    this.getAmbito();


  }


  getDataActividadCargo(actividadCargo: ActividadCargo[]) {
    this.actCargo = actividadCargo;
  }


  getDataConocimeinto(actividadEsen: ActividadEsencial[]) {
    this.actEsenc = actividadEsen;
  }

  getDataCompTec(CompTec: CompTecPuesto[]) {
    this.compTc = CompTec
  }

  getDataCompCond(CompCond: CompCondPuesto[]) {
    this.compCd = CompCond
  }

  getDataExp(exp: ExperienciaPuesto[]) {
    this.expe = exp;
    console.log(this.expe);
  }


  updExperienciasPuestos(exepienciaPuesto: NgForm) {

    console.log(exepienciaPuesto.value);
    let array: string[] = [];
    let arraytimp: string[] = [];

    arraytimp.push(exepienciaPuesto.value.tiempoExp);
    arraytimp.push(exepienciaPuesto.value.tiempoExp1);
    arraytimp.push(exepienciaPuesto.value.tiempoExp2);

    array.push(this.descExpU);
    array.push(this.descExp1U);
    array.push(this.descExp2U);

    for (let i = 0; i < array.length; i++) {


      this._experiencia.getExperienciaDesc(array[i]).subscribe(result => {

        this._exepienciaPuesto.updExpPuest(

          this.areaExpU1,
          arraytimp[i],
          exepienciaPuesto.value.especificidadExp,
          result.experiencia[0]._id,
          this.idModificar,
          this.idupdExpPuest[i])
          .subscribe(resp => {
            console.log(resp);
            this.listapuesto();
            this.toastr.success('Agregado Correctamente', 'Correcto');
          })
      })



    }
    this.getExperi();


  }

  getExperi() {

    this._exepienciaPuesto.getExpPuesto(this.idModificar).subscribe(resp => {
      console.log(resp);
      this.experienciasPuestosb = resp.expPuesto;

    })

  }
  getValorExp(form: NgForm) {



    console.log(form.value);
    this.descExpU = this.descExp;
    this.descExp1U = this.descExp1;
    this.descExp2U = this.descExp2;
    this.areaExpU1 = form.value.areaExpU1;
  }
  addActividadesCargos(actividadCargo: NgForm) {
    console.log(actividadCargo.value);
    this._activdadCargo.agregarActividadCargo(
      actividadCargo.value.desActCarg,
      actividadCargo.value.frActCarg,
      actividadCargo.value.coActCarg,
      actividadCargo.value.cmActCarg,
      this.totalActCarg + "",
      this.idModificar,
    ).subscribe(resp => {
      this.actCargo.push(resp.actividadCargo)
      console.log(resp);
      this.toastr.success('Agregado Correctamente', 'Correcto');
    })
  }

  addCompTecPuestos(compTecPuesto: NgForm) {

    console.log("entroo metodo");
    let coincidenciaTecnica = false;
    if (this.compTc.length > 0) {

      for (let i = 0; i < this.compTc.length; i++) {
        console.log(this.compTc[i].compTecObs['_id'] + "== " + compTecPuesto.value.CompTecObs);

        if (this.compTc[i].compTecObs['_id'] == compTecPuesto.value.CompTecObs) {

          Swal.fire({
            icon: 'error',
            text: 'Competencia ya agregada!!!',
            showClass: {
              popup: 'animated fadeInDown faster'
            },
            hideClass: {
              popup: 'animated fadeOutUp faster'
            }
          });
          coincidenciaTecnica = true;
        }

      }
      if (coincidenciaTecnica == false) {

        this._compTecPuesto.agregarCompTecPuesto(
          this.idModificar,
          compTecPuesto.value.CompTecObs)
          .subscribe(resp => {

            this.getBuscarCompTecPuestoPuesto(this.idModificar);
            this.compTc.push(resp.compTecPuesto);
            console.log("array");
            console.log(this.compTc);
          })

      } else {
        console.log("no conicide tecnica")
      }

    } else {

      this._compTecPuesto.agregarCompTecPuesto(
        this.idModificar,
        compTecPuesto.value.CompTecObs)
        .subscribe(resp => {

          this.getBuscarCompTecPuestoPuesto(this.idModificar);
          this.compTc.push(resp.compTecPuesto);

          console.log("array 2");
          console.log(this.compTc);

        })

    }


  }

  addCompCondPuestos(compCondPuesto: NgForm) {

    let coincidenciaConductual = false;
    console.log(compCondPuesto.value);
    if (this.compCd.length > 0) {


      for (let i = 0; i < this.compCd.length; i++) {
        console.log(this.compCd[i].compCondObs['_id'] + "== " + compCondPuesto.value.compCondObs);

        if (this.compCd[i].compCondObs['_id'] == compCondPuesto.value.compCondObs) {
          Swal.fire({
            icon: 'error',
            text: 'Competencia ya agregada!!!',
            showClass: {
              popup: 'animated fadeInDown faster'
            },
            hideClass: {
              popup: 'animated fadeOutUp faster'
            }
          });
          coincidenciaConductual = true;
        }
      }
      if (coincidenciaConductual == false) {
        console.log(compCondPuesto.value.compCondObs);


        this._compCondPuesto.agregarCompCondPuesto(
          this.idModificar,
          compCondPuesto.value.compCondObs)
          .subscribe(resp => {

            this.getBuscarCompCondPuestoPuesto(this.idModificar);
            this.compCd.push(resp.compCondPuesto);
          })

      } else {
        console.log("coincide ninguno0");
      }
    } else {


      this._compCondPuesto.agregarCompCondPuesto(
        this.idModificar,
        compCondPuesto.value.compCondObs)
        .subscribe(resp => {

          console.log("aquiiiiess")
          console.log(resp);
          this.getBuscarCompCondPuestoPuesto(this.idModificar);
          this.compCd.push(resp.compCondPuesto);
        })
    }
  }

  calcularTotal(valor: number, opcion: number) {
    if (opcion == 1) {
      this.frActCarg = valor;
    } else if (opcion == 2) {
      this.coActCarg = valor;
    } else {
      this.cmActCarg = valor;
    }
    console.log("valor1:" + this.frActCarg);
    console.log("valor2:" + this.coActCarg);
    console.log("valor3:" + this.cmActCarg);
    this.totalActCarg = Number(this.frActCarg) + Number((this.coActCarg * this.cmActCarg));
    console.log("total:" + this.totalActCarg);
  }


  eliminarActividadCargo(id: string, index) {
    Swal.fire({
      icon: 'error',
      title: "¿Seguro desea eliminar",
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
        this._activdadCargo.eliActCarg(id).subscribe(resp => {


          for (let i = 0; i < this.actCargo.length; i++) {
            if (i === index) {
              this.actCargo.splice(i, 1);
            }

          }
          this.toastr.success('Eliminado Correctamente', 'Correcto');
        })
      }

    })
  }


  ordenar() {
    this._activdadCargo.getActividadCargoOr(this.idModificar).subscribe(resp => {
      let actpuesto = resp.actividadCargo;

      for (let i = 0; i < actpuesto.length; i++) {
        for (let j = 0; j < actpuesto.length; j++) {

          if (parseInt(actpuesto[j].total) < parseInt(actpuesto[i].total)) {

            var temp = actpuesto[i];
            actpuesto[i] = actpuesto[j];
            actpuesto[j] = temp;
          }
        }

      }
      let a = 0;
      if (actpuesto.length > 5) {
        a = 5;

      } else {
        a = actpuesto.length;
      }

      for (let z = 0; z < a; z++) {
        this.prueba[z] = actpuesto[z];
        this.nuevoConoc[z] = {
          descripcion: this.prueba[z].descripcion,
          estado: "true",
          empresa: this.prueba[z].empresa,
          puesto: this.prueba[z].puesto,
          conocimientoAdicional: ""
        };
        console.log(this.prueba[z]);
      }
    })

  }



  addConocimiento(act: NgForm) {
    console.log(act);
  }


  compararActividades() {
    this.getConocimiento();
    let coincide: Boolean = false;
    let cont = 0;
    console.log(this.actEsenc.length);
    console.log(this.prueba.length);


    for (let j = 0; j < this.prueba.length; j++) {
      coincide = false;
      for (let i = 0; i < this.actEsenc.length; i++) {
        console.log(coincide + "(" + i + "-" + j + ")");

        if (this.actEsenc[i].descripcion == this.prueba[j].descripcion) {
          coincide = true;
        }
      }
      //  console.log(coincide);
      if (coincide == false) {
        console.log("no coincide");
        this.temp[cont] = j;
        cont = cont + 1;
      } else {
        this.nuevoConoc[j].conocimientoAdicional = this.actEsenc[j].conocimientoAdicional["_id"];
      }
    }
    console.log(this.nuevoConoc);
    if (this.temp.length > 0) {
      this.modalupd = true;
    }
  }

  getConocimiento() {
    this._conocimiento.getConocimiento().subscribe(resp => {
      this.conocimientos = resp.conocimiento;
      console.log(resp);
    })
  }

  addcompPos(index: number, comple: string) {

    this.nuevoConoc[index].conocimientoAdicional = comple;
    console.log(this.nuevoConoc);

  }

  selectcomp(index: number, comple: string) {
    this.ArrayComplemento[index] = comple;
    console.log(index);
    console.log(this.ArrayComplemento);

  }

  agregarNuevoCono() {
    let cont = 0;
    for (let j = 0; j < this.actEsenc.length; j++) {

      this._actividadEsencial.elActEsen(this.actEsenc[j]._id).subscribe(resp => {
        cont = cont + 1;
      });

    }
    // if (this.actEsenc.length == cont) {
    for (let i = 0; i < this.nuevoConoc.length; i++) {

      this._actividadEsencial.agregarActividadEsencial(this.nuevoConoc[i].descripcion, this.nuevoConoc[i].puesto, this.nuevoConoc[i].conocimientoAdicional).subscribe(resp1 => {
        console.log(resp1);
      })
    }
    this.closebuttonadd.nativeElement.click();
    this.modalupd = false;
    this.temp = [];
    this.nuevoConoc = [];
    this.actEsenc = [];
    this.prueba = [];
    this.getActividadEsencial();
    // }


  }
  getActividadEsencial() {
    this._actividadEsencial.getActividadEsencial().subscribe(resp => {
      console.log(resp);
      this.actividadesEsenciales = resp.actividadEsencial;
    })
  }
  getRol() {
    this._rol.getRol().subscribe(resp => {
      let cont = 0;
      for (let i = 0; i < resp.rol.length; i++) {
        if (resp.rol[i]._id != this.rol[0]._id) {
          this.roles[cont] = resp.rol[i];
          cont++;
        }

      }

      this.descRol = this.roles[0].descripcion;
    })
  }

  getAmbito() {
    this._ambito.getAmbito().subscribe(resp => {
      console.log(resp);
      let cont = 0;
      for (let i = 0; i < resp.ambito.length; i++) {
        if (resp.ambito[i]._id != this.ambito[0]._id) {
          this.ambitos[cont] = resp.ambito[i];
          cont++;
        }
      }
      this.descAmb = this.ambitos[0].descripcion;
    })
  }

  getRolId(IdR: string) {
    this._puesto.getRolID(IdR).subscribe(resp => {
      this.rol = resp.rol;
    }, (err) => {
      console.log(err);
    })

  }


  getAmbitoId(IdA: string) {
    this._puesto.getAmbID(IdA).subscribe(resp => {
      this.ambito = resp.ambito;
    }, (err) => {
      console.log(err);
    })
  }


  getExperiencia() {
    let cont = 0;
    let cont1 = 0;
    let cont2 = 0;
    this._experiencia.getExperiencia().subscribe(resp => {
      console.log(resp);
      for (let i = 0; i < resp.experiencia.length; i++) {
        if (resp.experiencia[i].estado === "true") {
          if (resp.experiencia[i].grado == "1") {
            this.experiencias[cont] = resp.experiencia[i];
            this.idExp = this.experiencias[0]._id;
            this.descExp = this.experiencias[0].descripcion;
            cont++;
          } else if (resp.experiencia[i].grado == "2") {
            this.experiencias1[cont1] = resp.experiencia[i];
            this.idExp1 = this.experiencias1[0]._id;
            this.descExp1 = this.experiencias1[0].descripcion;
            cont1++;
          } else if (resp.experiencia[i].grado == "3") {
            this.experiencias2[cont2] = resp.experiencia[i];
            this.idExp2 = this.experiencias2[0]._id;
            this.descExp2 = this.experiencias2[0].descripcion;
            cont2++;
          }
        }

      }
    })
  }

  getExperienciaPuesto() {
    this._exepienciaPuesto.getExperienciaPuesto().subscribe(resp => {
      console.log(resp);
      this.experienciasPuestos = resp.expPuesto;
    })
  }

  updExperienciasTimEsp(exepienciaPuesto: NgForm) {


    let tiempo: string[] = [];
    tiempo.push(exepienciaPuesto.value.tiempoExp);
    tiempo.push(exepienciaPuesto.value.tiempoExp1);
    tiempo.push(exepienciaPuesto.value.tiempoExp2);

    for (let i = 0; i < tiempo.length; i++) {

      this._exepienciaPuesto.updExpPuestTiempEsp(

        this.experienciasPuestos[i]._id,
        tiempo[i],
        exepienciaPuesto.value.tiempoExp,
      )
        .subscribe(resp => {
          console.log(resp);
          this.listapuesto();
          this.toastr.success('Agregado Correctamente', 'Correcto');
        })

    }
    // this.getExperi();

  }

  updPuestos(form: NgForm) {
    console.log(form.value);
    this._puesto.updPuesto(
      form.value.codigoPuest,
      form.value.denominacionPuest,
      form.value.misionPuest,
      form.value.nivelPuest,
      form.value.unidadAdminPuest,
      form.value.RIEPuest,
      form.value.capacitacionPuest,
      form.value.gradoPuest,
      form.value.rolPuest,
      form.value.grupoOcupacionalPuest,
      form.value.ambitoPuest,
      this.idModificar).subscribe(correcto => {
        this.listapuesto();
        this.toastr.success('Modificado Correctamente', 'Correcto');
      });
  }

  updPuestoMision(form: NgForm) {
    console.log(form.value);
    this._puesto.updPuestoMision(
      form.value.misionPuest,
      this.idModificar).subscribe(correcto => {
        this.listapuesto();
        this.toastr.success('Modificado Correctamente', 'Correcto');
      });
  }

  updPuestoRIE(form: NgForm) {
    console.log(form.value);
    this._puesto.updPuestoRIE(
      form.value.RIEPuest,
      this.idModificar).subscribe(correcto => {
        this.listapuesto();
        this.toastr.success('Modificado Correctamente', 'Correcto');
      });
  }

  updPuestoCapacidad(form: NgForm) {
    console.log(form.value);
    this._puesto.updPuestoCapacitacion(
      form.value.capacitacionPuest,
      this.idModificar).subscribe(correcto => {
        this.listapuesto();
        this.toastr.success('Modificado Correctamente', 'Correcto');
      });
  }

  getBuscarCompTecPuestoPuesto(id: string) {
    this._compTecPuesto.getBuscarCompTecPuestoPuesto(id).subscribe(resp => {

      this.compTc = resp.compTecPuesto;
      console.log(this.compTc);
    })
  }

  selectDenominaT(Id: string) {

    console.log(Id);
    this._ctcomportamiento.getCt(Id).subscribe(resp => {
      console.log(resp);
      this.ctcomportamientos = resp.compTecObs;
    });
  }
  verificarId(id: string) {
    console.log(id);
  }

  selectDenominaC(Id: string) {

    console.log(Id);
    this._cccomportamiento.getCC(Id).subscribe(resp => {
      console.log(resp);
      this.cccomportamientos = resp.compCondObs;
    });
  }


  elimarCompTecPuesto(id: string, index) {
    Swal.fire({
      icon: 'error',
      title: "¿Seguro desea eliminar",
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
        this._compTecPuesto.elimarCompTecPuesto(id).subscribe(resp => {

          for (let i = 0; i < this.compTc.length; i++) {
            if (i === index) {
              this.compTc.splice(i, 1);
            }

          }

          this.toastr.success('Eliminado Correctamente', 'Correcto');
        })
      }
    })

  }


  eliminarCompCondPuesto(id: string, index) {
    Swal.fire({
      icon: 'error',
      title: "¿Seguro desea eliminar",
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
        this._compCondPuesto.eliminarCompCondPuesto(id).subscribe(resp => {

          for (let i = 0; i < this.compCd.length; i++) {
            if (i === index) {
              this.compCd.splice(i, 1);
            }

          }
          this.getBuscarCompCondPuestoPuesto(this.idModificar);
          this.toastr.success('Eliminado Correctamente', 'Correcto');
        })
      }
    })

  }

  getCompetenciaTecnica() {
    this._competenciaTecnica.getCompetenciaTecnica().subscribe(resp => {

      this.competenciasTecnicas = resp.competenciaTecnica;
    })
  }

  getCompTecPuesto() {
    this._compTecPuesto.getCompTecPuesto().subscribe(resp => {
      console.log(resp);
      this.compTecPuestos = resp.compTecPuesto;
    })
  }


  getBuscarCompCondPuestoPuesto(id: string) {
    this._compCondPuesto.getBuscarCompCondPuestoPuesto(id).subscribe(resp => {

      this.compCd = resp.compCondPuesto;
      console.log(this.compCd);
    })
  }
  getCompetenciaConductual() {
    this._compCond.getCompetenciaConductual().subscribe(resp => {
      console.log(resp);
      this.competenciasConductuales = resp.competenciaConductual;
    })
  }

  getCompCondPuesto() {
    this._compCondPuesto.getCompCondPuesto().subscribe(resp => {
      console.log(resp);
      this.compCondPuestos = resp.compCondPuesto;
    })
  }


}