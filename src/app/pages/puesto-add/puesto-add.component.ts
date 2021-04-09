import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  PuestoService
} from '../../services/puesto.service';
import {
  Router
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import {
  Usuario
} from '../../../../../Admin/src/app/models/usuario.models';
import {
  Puesto
} from '../../models/puesto.models';
import {
  NgForm
} from '@angular/forms';
import Swal from 'sweetalert2';
import {
  Rol
} from '../../models/rol.models';
import {
  Ambito
} from '../../models/ambito.models';
import {
  CompTecObs
} from '../../models/compTecObs.models';
import {
  CompCondObs
} from '../../models/compCondObs.models';
import {
  RolService
} from '../../services/rol.service';
import {
  AmbitoService
} from '../../services/ambito.service';
import {
  CccomportamientoObsService
} from '../../services/cccomportamiento-obs.service';
import {
  CTcomportamientoObsService
} from '../../services/ctcomportamiento-obs.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ExperienciaPuestoService } from 'src/app/services/experiencia-puesto.service';
import { ExperienciaPuesto } from 'src/app/models/expPuesto.models';
import { Experiencia } from '../../models/experiencia.models';
import { ActividadEsencial } from '../../models/actividadEsencial.models';
import { ConocimientoAdicionalService } from '../../services/conocimiento-adicional.service';
import { ConocimientoAdicional } from '../../models/conocimientoAdicional.models';
import { ActividadEsencialService } from '../../services/actividad-esencial.service';
import { ActividadCargoService } from '../../services/actividad-cargo.service';
import { ActividadCargo } from '../../models/actividadCargo.models';
import { logging } from 'protractor';
import { CompetenciaTecnica } from '../../models/competenciaTecnica.models';
import { CompetenciaTecnicaService } from '../../services/competencia-tecnica.service';
import { CompTecPuesto } from '../../models/compTecPuesto';
import { CompTecPuestoService } from '../../services/comp-tec-puesto.service';
import { CompCondPuesto } from '../../models/compCondPuesto';
import { CompetenciaConductual } from '../../models/competenciaConductual.models';
import { CompetenciaConductualService } from '../../services/competencia-conductual.service';
import { CompCondPuestoService } from '../../services/comp-cond-puesto.service';
import swal from 'sweetalert';
import { UpdPuestoService } from '../../services/upd-puesto.service';
import { URL_SERVICE } from 'src/app/config/config';

@Component({
  selector: 'app-puesto-add',
  templateUrl: './puesto-add.component.html',
  styleUrls: ['./puesto-add.component.css']
})
export class PuestoAddComponent implements OnInit {

  idEmp = localStorage.getItem('empresaFact');
  empRol: Usuario;

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

  selectRol: string;

  areaExpU: String = "";
  tiempoExp: String = "";
  tiempoExp1: String = "";
  tiempoExp2: String = "";
  especificidadExp: String = "";
  experienciaExp: String = "";
  experienciaExp1: String = "";
  experienciaExp2: String = "";

  puestoExp: String = "";

  desActCarg: String = "";
  frActCarg: number = 0;
  coActCarg: number = 0;
  cmActCarg: number = 0;
  totalActCarg: number = 0;
  dataUpdActCarg: Boolean = false;
  getDataActCarg: ActividadCargo;
  desActCargU: String = "";
  frActCargU: String = "";
  coActCargU: String = "";
  cmActCargU: String = "";
  totalActCargU: String = "";

  IDModificar: string = "";
  comprobar: string = "false";
  comprobarexp: string = "false";
  comprobarActEse: string = "false";
  coincidencia: Boolean = true;
  paso5: Boolean = false;
  idcomplemento: string;

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

  desRol: string = "";
  desAmb: string = "";

  pidProv: string = "SELECCIONAR";
  pnomProv: string = "-Seleccionar-";

  competenciaCt: string = "";
  competenciaCc: string = "";
  idupdExpPuest: string[] = [];

  desActEse: string;

  nivel: string[] = [];

  puestos: Puesto[] = [];
  roles: Rol[] = [];
  ambitos: Ambito[] = [];
  actividadesCargos: ActividadCargo[] = [];
  experienciasPuestos: ExperienciaPuesto[] = [];
  experienciasPuestosb: ExperienciaPuesto[] = [];
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
  bcomptecPuestos: CompTecPuesto[] = [];
  bcompcondPuestos: CompCondPuesto[] = [];
  actividadesEsenciales: ActividadEsencial[] = [];


  prueba: ActividadCargo[] = [];

  @ViewChild('closebuttonadd', {
    static: false
  }) closebuttonadd;
  @ViewChild('closebuttonupd', {
    static: false
  }) closebuttonupd;
  constructor(
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
    public _updPuesto: UpdPuestoService,
    public router: Router,
    public toastr: ToastrService,
  ) { }


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

    this.getExperienciaPuesto();
    this.getPuesto();
    this.getRol();
    this.getAmbito();
    this.getExperiencia();
    this.getConocimiento();
    this.getCompetenciaTecnica();
    this.getCompetenciaConductual();

  }

  Carga() {
    this.router.navigate(['/addpuesto'])
      .then(() => {
        window.location.reload();
      })
  }

  AdditemActEsen(form: NgForm) {

    console.log(form.value);
    this.ArrayActEse.push(form.value.ActividadEsencial);
    console.log(this.ArrayActEse);

  }

  quitarItem(id) {


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

      for (let i = 0; i < this.ArrayActEse.length; i++) {
        if (i === id) {
          this.ArrayActEse.splice(i, 1);
        }
      }

    })
  }

  selectcomp(index: number, comple: string) {
    this.ArrayComplemento[index] = comple;
    console.log(index);
    console.log(this.ArrayComplemento);

  }

  selectDenominaT(Id: string) {

    console.log(Id);
    this._ctcomportamiento.getCt(Id).subscribe(resp => {
      console.log(resp);
      this.ctcomportamientos = resp.compTecObs;
    });
  }

  selectDenominaC(Id: string) {

    console.log(Id);
    this._cccomportamiento.getCC(Id).subscribe(resp => {
      console.log(resp);
      this.cccomportamientos = resp.compCondObs;
    });
  }



  instanciarComplemento() {
    for (let i = 0; i < this.ArrayActEse.length; i++) {

      this.ArrayComplemento[i] = this.conocimientos[0]._id;
      console.log(this.ArrayComplemento[i]);
    }
  }


  Comprobar(addPuesto: NgForm) {

    if (this.comprobar == "false") {
      console.log("Agregar");
      this.addPuestos(addPuesto);
      this.comprobar = "true";
    } else {
      console.log("modificar");
      this.updPuestos(addPuesto);
    }
  }


  ComprobarExp(addExp: NgForm) {
    if (this.comprobarexp == "false") {
      console.log("AgregarEXP");
      this.addExperienciasPuestos(addExp);
      this.comprobarexp = "true";
    } else {
      console.log("modificarEXP");
      this.updExperienciasPuestos(addExp);
    }
  }



  ComprobarActEse(addExp: NgForm) {
    if (this.comprobarActEse == "false") {
      console.log("AgregarActEse");
      this.comprobarActEse = "true";
    } else {
      console.log("ModificarActEse");
      this.updExperienciasPuestos(addExp);
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

  getExperi() {

    this._exepienciaPuesto.getExpPuesto(this.IDModificar).subscribe(resp => {
      console.log(resp);
      this.experienciasPuestosb = resp.expPuesto;
      console.log(this.experienciasPuestosb);


    })

  }

  getActividadEsencial() {
    this._actividadEsencial.getActividadEsencial().subscribe(resp => {
      console.log(resp);
      this.actividadesEsenciales = resp.actividadEsencial;
    })
  }

  getActividadCargo() {
    this._activdadCargo.getActividadCargoxPuesto(this.IDModificar).subscribe(resp => {
      console.log(resp);
      this.actividadesCargos = resp.actividadCargo;
    })
  }

  getConocimiento() {
    this._conocimiento.getConocimiento().subscribe(resp => {
      this.conocimientos = resp.conocimiento;
      console.log(resp);
    })
  }

  getPuesto() {
    this._puesto.getPuesto().subscribe(resp => {
      console.log(resp);
      this.puestos = resp.puesto;
    })
  }

  getRol() {
    this._rol.getRol().subscribe(resp => {
      console.log(resp);
      this.roles = resp.rol;
      this.idRol = this.roles[0]._id;
      this.descRol = this.roles[0].descripcion;
    })
  }

  getAmbito() {
    this._ambito.getAmbito().subscribe(resp => {
      console.log(resp);
      this.ambitos = resp.ambito;
      this.idAmb = this.ambitos[0]._id;
      this.descAmb = this.ambitos[0].descripcion;
    })
  }


  getExperienciaPuesto() {
    this._exepienciaPuesto.getExperienciaPuesto().subscribe(resp => {
      console.log(resp);
      this.experienciasPuestos = resp.expPuesto;
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

  getValorExp(form: NgForm) {

    console.log(form.value);
    this.descExpU = form.value.descExp;
    this.descExp1U = form.value.descExp1;
    this.descExp2U = form.value.descExp2;
    this.areaExpU1 = form.value.areaExpU1;
    console.log("experiencia 1 es" + this.descExp);
    console.log("experiencia 2 es" + this.descExp1);
    console.log("experiencia 3 es" + this.descExp2);
    console.log("area es" + this.areaExpU1);
  }

  getRolId(IdR: string): Rol {

    let rol: Rol;

    this._puesto.getRolID(IdR).subscribe(resp => {

      rol = resp.rol[0];
      console.log(rol);
      // this.puestos = resp.puestos;
    })
    return rol;
  }

  getAmbitoId(IdA: string): Ambito {
    let ambito: Ambito;

    this._puesto.getAmbID(IdA).subscribe(resp => {
      console.log(resp);
      ambito = resp.ambito[0];
      // this.puestos = resp.puestos;
    })
    return ambito;
  }



  getBuscarCompTecPuestoPuesto(id: string) {
    this._compTecPuesto.getBuscarCompTecPuestoPuesto(id).subscribe(resp => {

      this.bcomptecPuestos = resp.compTecPuesto;
      console.log(this.bcomptecPuestos);
    })
  }


  getBuscarCompCondPuestoPuesto(id: string) {
    this._compCondPuesto.getBuscarCompCondPuestoPuesto(id).subscribe(resp => {

      this.bcompcondPuestos = resp.compCondPuesto;
      console.log(this.bcompcondPuestos);
    })
  }

  getCompetenciaTecnica() {
    this._competenciaTecnica.getCompetenciaTecnica().subscribe(resp => {

      this.competenciasTecnicas = resp.competenciaTecnica;
    })
  }



  getCompetenciaConductual() {
    this._compCond.getCompetenciaConductual().subscribe(resp => {
      console.log(resp);
      this.competenciasConductuales = resp.competenciaConductual;
    })
  }

  getCompTecPuesto() {
    this._compTecPuesto.getCompTecPuesto().subscribe(resp => {
      console.log(resp);
      this.compTecPuestos = resp.compTecPuesto;
    })
  }

  getCompCondPuesto() {
    this._compCondPuesto.getCompCondPuesto().subscribe(resp => {
      console.log(resp);
      this.compCondPuestos = resp.compCondPuesto;
    })
  }

  ComprobarPuesto(puesto: string) {

    for (let i = 0; i < this.puestos.length; i++) {
      if (puesto === this.puestos[i].denominacion) {
        Swal.fire({
          icon: 'error',
          text: 'Puesto ya existe',
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
  }

  addPuestos(puesto: NgForm) {

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
      puesto.value.ambitoPuest,
    )
      .subscribe(resp => {
        console.log(resp);
        this.IDModificar = resp.puesto._id;
        this.getPuesto();
        this.getActividadCargo();
        this.toastr.success('Agregado Correctamente', 'Correcto');
      })
  }

  addExperienciasPuestos(exepienciaPuesto: NgForm) {

    console.log(exepienciaPuesto.value);
    this.ArrayExperiencia.push(exepienciaPuesto.value.tiempoExp);
    this.ArrayExperiencia.push(exepienciaPuesto.value.tiempoExp1);
    this.ArrayExperiencia.push(exepienciaPuesto.value.tiempoExp2);

    this.nivel.push(this.descExpU);
    this.nivel.push(this.descExp1U);
    this.nivel.push(this.descExp2U);

    for (let i = 0; i < this.nivel.length; i++) {

      this._experiencia.getExperienciaDesc(this.nivel[i]).subscribe(result => {
        console.log(result);

        this._exepienciaPuesto.agregarExperienciaPuesto(


          this.areaExpU1,
          this.ArrayExperiencia[i],
          exepienciaPuesto.value.especificidadExp,
          result.experiencia[0]._id,
          this.IDModificar
        )
          .subscribe(resp => {
            this.idupdExpPuest.push(resp.expPuesto._id);
            console.log(resp);
            this.getExperienciaPuesto();
            this.toastr.success('Agregado Correctamente', 'Correcto');
          })
      })

    }

    this.getExperi();
    this.paso5 = true;
    console.log(this.nivel);

  }

  addGruposActividadesEsenciales() {

    for (let i = 0; i < this.prueba.length; i++) {

      this._actividadEsencial.agregarActividadEsencial(
        this.prueba[i].descripcion,
        this.IDModificar,
        this.ArrayComplemento[i])
        .subscribe(resp => {

          console.log(resp);
          this.toastr.success('Agregado Correctamente', 'Correcto');
        })
    }
  }

  addCompTecPuestos(compTecPuesto: NgForm) {

    let coincidenciaTecnica = false;
    if (this.bcomptecPuestos.length > 0) {

      for (let i = 0; i < this.bcomptecPuestos.length; i++) {
        console.log(this.bcomptecPuestos[i].compTecObs['_id'] + "== " + compTecPuesto.value.CompTecObs);

        if (this.bcomptecPuestos[i].compTecObs['_id'] == compTecPuesto.value.CompTecObs) {

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
          this.IDModificar,
          compTecPuesto.value.CompTecObs)
          .subscribe(resp => {

            console.log("aquiiii")
            console.log(resp);
            this.getBuscarCompTecPuestoPuesto(this.IDModificar);

          })

      } else {
        console.log("no conicide tecnica")
      }

    } else {

      this._compTecPuesto.agregarCompTecPuesto(
        this.IDModificar,
        compTecPuesto.value.CompTecObs)
        .subscribe(resp => {

          console.log("aquiiii")
          console.log(resp);
          this.getBuscarCompTecPuestoPuesto(this.IDModificar);

        })

    }


  }


  verificarId(id: string) {
    console.log(id);
  }

  addCompCondPuestos(compCondPuesto: NgForm) {

    let coincidenciaConductual = false;
    console.log(compCondPuesto.value);
    if (this.bcompcondPuestos.length > 0) {
      console.log("entro 1");

      for (let i = 0; i < this.bcompcondPuestos.length; i++) {
        console.log(this.bcompcondPuestos[i].compCondObs['_id'] + "== " + compCondPuesto.value.compCondObs);
        console.log("entro 2");
        if (this.bcompcondPuestos[i].compCondObs['_id'] == compCondPuesto.value.compCondObs) {
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
        console.log("no coincide ninguno0");
        console.log("entro en else");
        console.log(compCondPuesto.value.compCondObs);


        this._compCondPuesto.agregarCompCondPuesto(
          this.IDModificar,
          compCondPuesto.value.compCondObs)
          .subscribe(resp => {

            console.log("aquiiiiess")
            console.log(resp);
            this.getBuscarCompCondPuestoPuesto(this.IDModificar);
          })

      } else {
        console.log("coincide ninguno0");
      }
    } else {


      this._compCondPuesto.agregarCompCondPuesto(
        this.IDModificar,
        compCondPuesto.value.compCondObs)
        .subscribe(resp => {

          console.log("aquiiiiess")
          console.log(resp);
          this.getBuscarCompCondPuestoPuesto(this.IDModificar);
        })
    }
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
          this.IDModificar,
          this.idupdExpPuest[i])
          .subscribe(resp => {
            console.log(resp);
            this.getExperienciaPuesto();
            this.toastr.success('Agregado Correctamente', 'Correcto');
          })
      })



    }
    this.getExperi();

    console.log(this.nivel);

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
          this.getExperienciaPuesto();
          this.toastr.success('Agregado Correctamente', 'Correcto');
        })

    }
    this.getExperi();
    console.log(this.nivel);

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

      // form.value.compeCondObs,
      // form.value.compeTecObs

      form.value.grupoOcupacionalPuest,
      form.value.ambitoPuest,
      this.IDModificar).subscribe(correcto => {
        this.getPuesto();
        this.toastr.success('Modificado Correctamente', 'Correcto');
      });
  }

  updPuestoMision(form: NgForm) {
    console.log(form.value);
    this._puesto.updPuestoMision(
      form.value.misionPuest,
      this.IDModificar).subscribe(correcto => {
        this.getPuesto();
        this.toastr.success('Modificado Correctamente', 'Correcto');
      });
  }

  updPuestoRIE(form: NgForm) {
    console.log(form.value);
    this._puesto.updPuestoRIE(
      form.value.RIEPuest,
      this.IDModificar).subscribe(correcto => {
        this.getPuesto();
        this.toastr.success('Modificado Correctamente', 'Correcto');
      });
  }

  updPuestoCapacidad(form: NgForm) {
    console.log(form.value);
    this._puesto.updPuestoCapacitacion(
      form.value.capacitacionPuest,
      this.IDModificar).subscribe(correcto => {
        this.getPuesto();
        this.toastr.success('Modificado Correctamente', 'Correcto');
      });
  }

  addActividadesCargos(actividadCargo: NgForm) {

    console.log(actividadCargo.value);
    this._activdadCargo.agregarActividadCargo(
      actividadCargo.value.desActCarg,
      actividadCargo.value.frActCarg,
      actividadCargo.value.coActCarg,
      actividadCargo.value.cmActCarg,
      this.totalActCarg + "",
      this.IDModificar,
    ).subscribe(resp => {
      console.log(resp);
      this.getActividadCargo();
      this.toastr.success('Agregado Correctamente', 'Correcto');
    })
  }

  getDataActividadCargo(actividadCargo: ActividadCargo) {
    this.getDataActCarg = actividadCargo;

    this.desActCargU = actividadCargo.descripcion;
    this.frActCargU = actividadCargo.fr;
    this.coActCargU = actividadCargo.co;
    this.cmActCargU = actividadCargo.cm;
    this.totalActCargU = actividadCargo.total;
    this.dataUpdActCarg = true;
  }

  updActividadesCargos(form: NgForm) {
    console.log(form.value);
    this._activdadCargo.updActividadCargo(
      form.value.desActCargU,
      this.getDataActCarg._id,
      form.value.frActCargU,
      form.value.coActCargU,
      form.value.cmActCargU,
      form.value.totalActCargU,
      this.IDModificar,
    ).subscribe(correcto => {
      this.getActividadCargo();
      this.closebuttonupd.nativeElement.click();
      this.toastr.success('Modificado Correctamente', 'Correcto');
    });
  }

  eliminarActividadCargo(id: string) {
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
          this.getActividadCargo();
          this.toastr.success('Eliminado Correctamente', 'Correcto');
        })
      }
    })

  }


  eliminarCompCondPuesto(id: string) {
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
          this.getBuscarCompCondPuestoPuesto(this.IDModificar);
          this.toastr.success('Eliminado Correctamente', 'Correcto');
        })
      }
    })

  }


  elimarCompTecPuesto(id: string) {
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
          this.getBuscarCompTecPuestoPuesto(this.IDModificar);
          this.toastr.success('Eliminado Correctamente', 'Correcto');
        })
      }
    })

  }



  eliminarActividadEsencial(form: ActividadEsencial) {
    Swal.fire({
      icon: 'error',
      title: "¿Seguro desea eliminar a " + form.descripcion + "?",
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
        this._actividadEsencial.elActEsen(form._id).subscribe(resp => {
          this.getActividadEsencial();
          this.toastr.success('Eliminado Correctamente', 'Correcto');
        })
      }
    })

  }



  addRoles(rol: NgForm) {
    for (let i = 0; i < this.roles.length; i++) {
      if (rol.value.desRol === this.roles[i].descripcion) {
        Swal.fire({
          title: 'ya exise el Rol!',
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
        return;
      }
    }
    this._rol.agregarRol(rol.value.desRol).subscribe(resp => {
      console.log(resp);
      this.getRol();
      this.closebuttonadd.nativeElement.click();
      this.toastr.success('Agregado Correctamente', 'Correcto');

    })
  }


  addAmbitos(ambito: NgForm) {
    for (let i = 0; i < this.ambitos.length; i++) {
      if (ambito.value.desAmb === this.ambitos[i].descripcion) {
        Swal.fire({
          title: 'ya exise el Ambito!',
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
        return;
      }
    }
    this._ambito.agregarAmbito(ambito.value.desAmb).subscribe(resp => {
      console.log(resp);
      this.getAmbito();
      this.closebuttonadd.nativeElement.click();
      this.toastr.success('Agregado Correctamente', 'Correcto');
    })
  }


  ordenar() {
    this._activdadCargo.getActividadCargoOr(this.IDModificar).subscribe(resp => {
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
        console.log(this.prueba[z]);
      }

    })
  }


  generarpdf() {
    this._updPuesto.generarPDFA4(this.IDModificar).subscribe(resp => {
      console.log(resp);
      if (resp.ok == true) {
        console.log(resp);
        let filename = URL_SERVICE.url + "/getpdf/" + this.idEmp + "_puesto" + resp.actividadCargo[0].puesto.denominacion + ".pdf";
        window.open(filename);
      }
    })
  }
}