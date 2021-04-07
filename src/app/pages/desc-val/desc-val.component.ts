import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DescVal } from '../../models/descVal.models';
import { Usuario } from 'src/app/models/usuario.model';
import { DescValService } from '../../services/desc-val.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-desc-val',
  templateUrl: './desc-val.component.html',
  styleUrls: ['./desc-val.component.css']
})
export class DescValComponent implements OnInit {

  descripcion: string = "";
  observacion: string = "";
  calificacion: string = "";
  subtitulo: string = "";
  titulo: string = "";
  descripcionU: string = "";
  observacionU: string = "";
  calificacionU: string = "";
  subtituloU: string = "";
  tituloU: string = "";
  buscarVal: string = "";
  getDataVal: DescVal;
  dataUpdVal: Boolean = false;
  coincidencia: Boolean = true;
  descvalorizaciones: DescVal[] = [];
  empRol: Usuario;
  @ViewChild('closebuttonadd', { static: false }) closebuttonadd;
  @ViewChild('closebuttonupd', { static: false }) closebuttonupd;

  constructor(
    public _descvalorizacion: DescValService,
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
    this.getdescValorizacion();
  }

  getdescValorizacion() {
    this._descvalorizacion.getDescValorizacion().subscribe(resp => {
      console.log(resp);
      this.descvalorizaciones = resp.descval;
    })
  }


  addDescValorizacion(valorizacion: NgForm) {
    //     for (let i = 0; i < this.descvalorizaciones.length; i++) {
    //    if (valorizacion.value.desVal === this.descvalorizaciones[i].descripcion) {
    //     Swal.fire({
    //       title: 'ya exise la valorizacion!',
    //        icon: 'warning'
    //      });
    // return;
    //      return;
    //    }
    //  }
    this._descvalorizacion.agregarDescValorizacion(
      valorizacion.value.descripcion,
      valorizacion.value.observacion,
      valorizacion.value.calificacion,
      valorizacion.value.subtitulo,
      valorizacion.value.titulo
    ).subscribe(resp => {
      console.log(resp);
      this.getdescValorizacion();
      this.closebuttonadd.nativeElement.click();
      this.toastr.success('Agregado Correctamente', 'Correcto');
    })
  }

  getDataDescVal(valorizacion: DescVal) {
    this.getDataVal = valorizacion;

    this.descripcionU = valorizacion.descripcion
    this.observacionU = valorizacion.observacion
    this.calificacionU = valorizacion.calificacion
    this.subtituloU = valorizacion.subtitulo
    this.tituloU = valorizacion.titulo
    this.dataUpdVal = true;
  }

  updDescVal(form: NgForm) {
    console.log(form.value);
    this._descvalorizacion.updValorizacion(
      this.getDataVal._id,
      form.value.descripcionU,
      form.value.observacionU,
      form.value.calificacionU,
      form.value.subtituloU,
      form.value.tituloU,
    ).subscribe(correcto => {
      this.getdescValorizacion();
      this.closebuttonupd.nativeElement.click();
      this.toastr.success('Modificado Correctamente', 'Correcto');
    });
  }

  searchVal(buscar: NgForm) {
    console.log("entrooo");
    if (buscar.value.buscarVal == "") {
      this.coincidencia = true;
      this.getdescValorizacion();
    } else {
      this._descvalorizacion.searchVal(buscar.value.buscarVal).subscribe(correcto => {
        if (correcto.length === 0) {
          this.coincidencia = false;
          return;
        } else {
          this.coincidencia = true;
          this.descvalorizaciones = correcto;
        }
      });
    }
  }
}
