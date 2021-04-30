import { Component, OnInit, ViewChild } from '@angular/core';
import { CecyService } from 'src/app/services/cecy/cecy.service';
import { Role, User } from 'src/app/models/auth/models.index';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-cecy-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  
  url_list = "list";
  user: User;
  role: Role;

  msgs: any;
  
  lista_cursos : any = [];
  lista_cursos_inactivos : any = [];
  
  @ViewChild('dt') table: Table;

  
  constructor(private cecyService: CecyService,private _router: Router,private messageService: MessageService,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getLocalStorage();
  }

  public getLocalStorage() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.role = JSON.parse(localStorage.getItem('role')) as Role;
    if(this.role.id == 3){
      this.cargarCursos(this.user.id);
    } else if(this.role.id == 12){
      this.cargarAllCursos();
      this.cargarCursosInactivos();
    }
  }

  public cargarAllCursos(){
    
    this.cecyService.get("list", "").subscribe(
      (res: any) => {
        console.log(res);
        this.lista_cursos = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  public cargarCursos(user:any){
    var data : any = {
      id : user
    }
    this.cecyService.post("show", data, "").subscribe(
      (res: any) => {
        console.log(res);
        this.lista_cursos = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  public cargarCursosInactivos(){
    this.cecyService.get("disabled", "").subscribe(
      (res: any) => {
        console.log(res);
        this.lista_cursos_inactivos = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  public modificarCurso(cursoSeleccionado:any){
    console.log(cursoSeleccionado);
    this._router.navigate(['/cecy/forms/edit/'+cursoSeleccionado.id]);
  }

  public visualizarCurso(cursoSeleccionado:any){
    console.log(cursoSeleccionado);
    this._router.navigate(['/cecy/forms/view/'+cursoSeleccionado.id]);  
  }

  public planificarCurso(cursoSeleccionado:any){
    this._router.navigate(['/cecy/forms/planning/'+cursoSeleccionado.id]);  
  }

  public visualizarCursoPlanificacion(cursoSeleccionado:any){
    this._router.navigate(['/cecy/forms/planning-curso/'+cursoSeleccionado.id]);  
  }

  public visualizarPlanificacion(cursoSeleccionado:any){
    this._router.navigate(['/cecy/forms/planning-view/'+cursoSeleccionado.id]);  
  }

  public modificarPlanificacion(cursoSeleccionado:any){
    this._router.navigate(['/cecy/forms/planning-edit/'+cursoSeleccionado.id]);  
  }

  public eliminarCurso(cursoSeleccionado: any){

    this._spinner.show();
    var datos = {
      id : cursoSeleccionado.id
    }

    this.cecyService.post("delete", datos, "").subscribe(
      (res: any) => {
        console.log(res);
        if (res.msg.code == '200') {
          console.log('Curso eliminado Exitosamente.');

          this.messageService.add({
            key: 'msgToast',
            severity: 'success',
            summary: res['msg']['summary'],
            detail: res['msg']['detail']
          });

          this.getLocalStorage();

          this._spinner.hide();

        }
      },
      err => {
        console.log(err);
      }
    );

  }   

  public activarCurso(cursoSeleccionado: any){

    this._spinner.show();
    var datos = {
      id : cursoSeleccionado.id
    }

    this.cecyService.post("enabled", datos, "").subscribe(
      (res: any) => {
        console.log(res);
        if (res.msg.code == '200') {
          console.log('Curso Activado Exitosamente.');

          this.messageService.add({
            key: 'msgToast',
            severity: 'success',
            summary: res['msg']['summary'],
            detail: res['msg']['detail']
          });

          this.getLocalStorage();

          this._spinner.hide();

        }
      },
      err => {
        console.log(err);
      }
    );

  } 

}
