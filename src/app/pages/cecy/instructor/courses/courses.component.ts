import { Component, OnInit } from '@angular/core';
import { CecyService } from 'src/app/services/cecy/cecy.service';
import { Curso } from 'src/app/models/cecy/curso';
import { Role, User } from 'src/app/models/auth/models.index';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cecy-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  
  url_list = "list";
  user: User;
  role: Role;
  
  lista_cursos : any = [];
  
  constructor(private cecyService: CecyService,private _router: Router) { }

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

  modificarCurso(cursoSeleccionado:any){
    console.log(cursoSeleccionado);
    this._router.navigate(['/cecy/forms/edit/'+cursoSeleccionado.id]);
  }

  public visualizarCurso(cursoSeleccionado:any){
    console.log(cursoSeleccionado);
    this._router.navigate(['/cecy/forms/view/'+cursoSeleccionado.id]);  
  }

  public planificarCurso(cursoSeleccionado:any){
    console.log(cursoSeleccionado);
    this._router.navigate(['/cecy/forms/planning/'+cursoSeleccionado.id]);  
  }

}
