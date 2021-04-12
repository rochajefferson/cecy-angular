import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CecyService } from '../../../../services/cecy/cecy.service'
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/auth/user';
import { Necesidad } from 'src/app/models/cecy/necesidad';
import { Requisito } from 'src/app/models/cecy/requisito';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from 'src/app/services/globals/globals.service';
import { Role } from 'src/app/models/auth/role';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;
var moment = require('moment'); // require

@Component({
  selector: 'app-cecy-form',
  templateUrl: './form.component.html',
})
export class FormsComponent implements OnInit {

  user: User;
  role: Role;
  nombreDocente: any;

  //curso : Curso;

  public curso: any = {
    id_curso: 0,
    name: '',
    code: '',
    free: '',
    cost: '',
    school_period: '',
    classroom: '',
    hours_duration: '',
    capacity: '',
    place: '',
    resume: '',
    career: '',
    teacher: '',
    course_period: '',
    user_id: 0,
    username: '',
    course_type: '',
    modality: '',
    paralel: '',
    end_time: '',
    start_time: '',
    day: '',
    participant_type: '',
    lista_necesidades: '',
    photo: '',
    WORKDAY_TYPE: '',
    area: '',
    specialty: '',
    status_cecy: '',
    lista_requisitos: '',
    lista_prerequisitos: '',
    lista_temas_principales: '',
    lista_temas_secundarios: '',
    lista_temas_transversales: '',
    lista_evaluaciones_diagnosticas: '',
    lista_evaluaciones_procesos: '',
    lista_evaluaciones_finales: '',
    practice_hours: '',
    theory_hours: '',
    lista_bibliografias: '',
    lista_instalaciones: '',
    lista_fases_teoricas: '',
    lista_fases_practicas: '',
    observation: '',

  }

  public planning: any = {
    course_id: 0,
    code: '',
    record: '',
    fechaCreacion: '',
    school_period_id: '',
    teacher_id: '',
    lista_necesidades_planning: '',
    fechaInicio: '',
    fechaFinalizacion: '',
    fechaFinal: '',
    days: '',
    develop_day_id: '',
    start_time_id: '',
    end_time_id: '',
    classroom_id: '',
    capacity: '',
    paralel_id: '',
    workday_type_id: '',
    code_certificate: '',
    state_certificate: '',
    instructor_id: '',
    status_cecy_id: '',
    resumen_planning: ''
  }

  value: boolean;

  url_combo = "combo";

  list_carrers = [];
  list_school_period = [];
  list_classroom = [];
  list_academic_periods = [];
  list_course_type = [];
  list_modality = [];
  list_participant_type = [];
  list_area = [];
  list_specialty = [];
  list_paralel = [];
  list_status_cecy = [];
  list_end_time = [];
  list_start_time = [];
  list_day = [];
  list_teacher = [];
  list_WORKDAY_TYPE = [];
  list_courses_existing = [];

  necesidades: Necesidad[] = [];
  necesidadText: any;

  necesidades_planning: Necesidad[] = [];
  necesidad_planningText: any;

  requisitos: Requisito[] = [];
  requisitoText: any;

  prerequisitos: Requisito[] = [];
  prerequisitoSeleccionado: any;

  bibliografias: Requisito[] = [];
  bibliografiaText: any;

  temasPrincipales: Requisito[] = [];
  pricipalText: any;

  temasSecundarios: Requisito[] = [];
  secundaryText: any;

  temasTransversales: Requisito[] = [];
  transversalText: any;

  instalaciones: Requisito[] = [];
  instalacionText: any;

  fasesTeoricas: Requisito[] = [];
  faseTeoricaText: any;

  fasesPracticas: Requisito[] = [];
  fasePracticaText: any;

  msgs: any;

  evaluacionesDiagnosticas: any = [];
  evaluacionDiagnostica: any = {
    tecnica: '',
    instrumento: ''
  }

  evaluacionesProcesos: any = [];
  evaluacionProceso: any = {
    tecnica: '',
    instrumento: ''
  }


  evaluacionesFinales: any = [];
  evaluacionFinal: any = {
    tecnica: '',
    instrumento: ''
  }

  imagenCurso: any;

  carreraSeleccionada: any;
  fechaInicioSeleccionado: any;
  fechaFinSeleccionado: any;
  diaSeleccionado: any;
  paraleloSeleccionado: any;
  periodoSeleccionado: any;
  tipoCursoSeleccionado: any;
  modalidadSeleccionada: any;
  tipoParticipanteSeleccionado: any;
  areaSeleccionada: any;
  especialidadSeleccionada: any;
  escuelaPeriodoSeleccionado: any;
  profesorSeleccionado: any;
  estatusSeleccionado: any;
  jornadaSeleccionada: any;
  aulaSeleccionada: any;
  instructorSeleccionado: any;
  periodoPlanificacionSeleccionado: any;

  botonGuardar = true;
  botonModificar = false;

  variableConfiguracion: any;
  variableVisualizacion = false;

  visualizarPlanificacion = false;

  constructor(
    private cecyService: CecyService, 
    private formBuilder: FormBuilder,
    private messageService: MessageService, 
    private _router: Router, 
    private globales: GlobalsService, 
    public activatedRouter: ActivatedRoute,
    private _spinner: NgxSpinnerService,
    ) {}

  ngOnInit() {
    this.planning.fechaCreacion = new Date();
    this.getLocalStorage();
  }

  public getLocalStorage() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.role = JSON.parse(localStorage.getItem('role')) as Role;
    this.curso.username = this.user.first_name + " " + this.user.second_name + " " + this.user.first_lastname + " " + this.user.second_lastname;
    this.curso.user_id = this.user.id;
    this.varidarInformacion();
  }

  varidarInformacion() {
    var datos: any = this.activatedRouter.snapshot;
    if (datos.url.length != 0) {
      var idCurso = this.activatedRouter.snapshot.params.id;
      this.variableConfiguracion = this.activatedRouter.snapshot.url[0].path == null ? '' : this.activatedRouter.snapshot.url[0].path;

      if (this.role.id == 3) {
        this.visualizarPlanificacion = false;
      } else if (this.role.id == 12) {
        this.visualizarPlanificacion = true;
      }

      if (idCurso == undefined) {
        this.listarCombos();
        this.botonGuardar = true;
        this.botonModificar = false;
        this.variableVisualizacion = false;
      } else if (idCurso != undefined && this.variableConfiguracion == 'edit') {
        this.cargarDatosFormulario(idCurso);
        this.botonGuardar = false;
        this.botonModificar = true;
        this.variableVisualizacion = false;
      } else if (idCurso != undefined && this.variableConfiguracion == 'view') {
        this.cargarDatosFormulario(idCurso);
        this.botonGuardar = false;
        this.botonModificar = false;
        this.variableVisualizacion = true;
      } else if (idCurso != undefined && this.variableConfiguracion == 'planning') {
        this.cargarDatosFormulario(idCurso);
        this.botonGuardar = false;
        this.botonModificar = false;
        this.variableVisualizacion = true;
      }

    } else {
      this.listarCombos();
      this.botonGuardar = true;
      this.botonModificar = false;
      this.variableVisualizacion = false;
    }
  }

  public cargarDatosFormulario(idCurso: any) {
    var data: any = {
      id: idCurso
    }
    this.cecyService.post("edit", data, "").subscribe(
      (res: any) => {
        var cursoRecuperado = res[0];
        this.curso = cursoRecuperado;
        this.nombreDocente = cursoRecuperado.username;
        this.imagenCurso = cursoRecuperado.photo;
        this.necesidades = JSON.parse(cursoRecuperado.lista_necesidades);
        this.requisitos = JSON.parse(cursoRecuperado.lista_requisitos);
        this.prerequisitos = JSON.parse(cursoRecuperado.lista_prerequisitos);
        this.temasPrincipales = JSON.parse(cursoRecuperado.lista_temas_principales);
        this.temasSecundarios = JSON.parse(cursoRecuperado.lista_temas_secundarios);
        this.temasTransversales = JSON.parse(cursoRecuperado.lista_temas_transversales);
        this.evaluacionesDiagnosticas = JSON.parse(cursoRecuperado.lista_evaluaciones_diagnosticas);
        this.evaluacionesProcesos = JSON.parse(cursoRecuperado.lista_evaluaciones_procesos);
        this.evaluacionesFinales = JSON.parse(cursoRecuperado.lista_evaluaciones_finales);
        this.instalaciones = JSON.parse(cursoRecuperado.lista_instalaciones);
        this.fasesTeoricas = JSON.parse(cursoRecuperado.lista_fases_teoricas);
        this.fasesPracticas = JSON.parse(cursoRecuperado.lista_fases_practicas);
        this.bibliografias = JSON.parse(cursoRecuperado.bibliographys);
        this.listarCombosEdicion(cursoRecuperado);
      },
      err => {
        console.log(err);
      }
    );
  }

  public listarCombos() {
    this.cecyService.get("combo", "").subscribe(
      (res: any) => {
        this.list_carrers = res.career;
        this.list_academic_periods = res.academic_period;
        this.list_course_type = res.course_type;
        this.list_modality = res.modality;
        this.list_participant_type = res.participant_type;
        this.list_area = res.area;
        this.list_specialty = res.specialty;
        this.list_paralel = res.paralel;
        this.list_end_time = res.end_time;
        this.list_start_time = res.start_time;
        this.list_day = res.day;
        this.list_school_period = res.school_period;
        this.list_teacher = res.teacher;
        this.list_status_cecy = res.status_cecy;
        this.list_WORKDAY_TYPE = res.WORKDAY_TYPE;
        this.list_classroom = res.classroom;
        this.list_courses_existing = res.courses_existing;
      },
      err => {
        console.log(err);
      }
    );
  }

  public listarCombosEdicion(cursoSeleccionado: any) {
    this.cecyService.get("combo", "").subscribe(
      (res: any) => {
        console.log('COMBOS',res)
        this.list_carrers = res.career;
        this.list_academic_periods = res.academic_period;
        this.list_course_type = res.course_type;
        this.list_modality = res.modality;
        this.list_participant_type = res.participant_type;
        this.list_area = res.area;
        this.list_specialty = res.specialty;
        this.list_paralel = res.paralel;
        this.list_end_time = res.end_time;
        this.list_start_time = res.start_time;
        this.list_day = res.day;
        this.list_school_period = res.school_period;
        this.list_teacher = res.teacher;
        this.list_status_cecy = res.status_cecy;
        this.list_WORKDAY_TYPE = res.WORKDAY_TYPE;
        this.list_classroom = res.classroom;
        this.list_courses_existing = res.courses_existing;

        for (var item of this.list_carrers) {
          if (item.id = cursoSeleccionado.career_id) {
            this.carreraSeleccionada = item;
          }
        }

        for (var item of this.list_academic_periods) {
          if (item.id = cursoSeleccionado.course_type_id) {
            this.periodoSeleccionado = item;
          }
        }

        for (var item of this.list_course_type) {
          if (item.id = cursoSeleccionado.course_type_id) {
            this.tipoCursoSeleccionado = item;
          }
        }

        for (var item of this.list_modality) {
          if (item.id = cursoSeleccionado.modality_id) {
            this.modalidadSeleccionada = item;
          }
        }

        for (var item of this.list_participant_type) {
          if (item.id = cursoSeleccionado.participant_type_id) {
            this.tipoParticipanteSeleccionado = item;
          }
        }

        for (var item of this.list_area) {
          if (item.id = cursoSeleccionado.area_id) {
            this.areaSeleccionada = item;
          }
        }

        for (var item of this.list_specialty) {
          if (item.id = cursoSeleccionado.specialty_id) {
            this.especialidadSeleccionada = item;
          }
        }

      },
      err => {
        console.log(err);
      }
    );
  }

  add_necesidad(event: Event) {
    event.preventDefault();
    if (this.necesidadText != undefined) {
      if (this.necesidadText != "") {
        this.necesidades.push(this.necesidadText);
        this.necesidadText = "";
      } else {
        this.showViaService('necesidad');
      }
    } else {
      this.showViaService('necesidad');
    }
  }

  delete_necesidad(necesidadesSelected: any) {
    var indice = this.necesidades.indexOf(necesidadesSelected); // obtenemos el indice
    this.necesidades.splice(indice, 1);
  }

  add_prerequisito(event: Event) {
    event.preventDefault();
    this.prerequisitos.push(this.prerequisitoSeleccionado.name);
    this.prerequisitoSeleccionado = "";
  }

  delete_prerequisito(prerequisitoSelected: any) {
    var indice = this.prerequisitos.indexOf(prerequisitoSelected); // obtenemos el indice
    this.prerequisitos.splice(indice, 1);
  }

  add_requisito(event: Event) {
    event.preventDefault();
    this.requisitos.push(this.requisitoText);
    this.requisitoText = "";
  }

  delete_requisito(requisitoSelected: any) {
    var indice = this.requisitos.indexOf(requisitoSelected); // obtenemos el indice
    this.requisitos.splice(indice, 1);
  }

  add_bibliografia(event: Event) {
    event.preventDefault();
    this.bibliografias.push(this.bibliografiaText);
    this.bibliografiaText = "";
  }

  delete_bibliografia(bibliografiaSelected: any) {
    var indice = this.bibliografias.indexOf(bibliografiaSelected); // obtenemos el indice
    this.bibliografias.splice(indice, 1);
  }

  add_tema_principal(event: Event) {
    event.preventDefault();
    this.temasPrincipales.push(this.pricipalText);
    this.pricipalText = "";
  }

  delete_tema_principal(temaPrincipalSelected: any) {
    var indice = this.temasPrincipales.indexOf(temaPrincipalSelected); // obtenemos el indice
    this.temasPrincipales.splice(indice, 1);
  }

  add_tema_secundario(event: Event) {
    event.preventDefault();
    this.temasSecundarios.push(this.secundaryText);
    this.secundaryText = "";
  }

  delete_tema_secundario(temaSecundarioSelected: any) {
    var indice = this.temasSecundarios.indexOf(temaSecundarioSelected); // obtenemos el indice
    this.temasSecundarios.splice(indice, 1);
  }

  add_tema_transversal(event: Event) {
    event.preventDefault();
    this.temasTransversales.push(this.transversalText);
    this.transversalText = "";
  }

  delete_tema_transversal(temaTransversalSelected: any) {
    var indice = this.temasTransversales.indexOf(temaTransversalSelected); // obtenemos el indice
    this.temasTransversales.splice(indice, 1);
  }

  add_evaluacion_diagnostica(event: Event) {
    this.evaluacionesDiagnosticas.push(this.evaluacionDiagnostica);
    this.evaluacionDiagnostica = {
      tecnica: '',
      instrumento: ''
    }
  }

  delete_evaluacion_diagnostica(evaluacionDiagnosticaSelected: any) {
    var indice = this.evaluacionesDiagnosticas.indexOf(evaluacionDiagnosticaSelected); // obtenemos el indice
    this.evaluacionesDiagnosticas.splice(indice, 1);
  }

  add_proceso_formativo(event: Event) {
    this.evaluacionesProcesos.push(this.evaluacionProceso);
    this.evaluacionProceso = {
      tecnica: '',
      instrumento: ''
    }
  }

  delete_proceso_formativo(evaluacionProcesoSelected: any) {
    var indice = this.evaluacionesProcesos.indexOf(evaluacionProcesoSelected); // obtenemos el indice
    this.evaluacionesProcesos.splice(indice, 1);
  }

  add_proceso_final(event: Event) {
    this.evaluacionesFinales.push(this.evaluacionFinal);
    this.evaluacionFinal = {
      tecnica: '',
      instrumento: ''
    }
  }

  delete_proceso_final(evaluacionFinalSelected: any) {
    var indice = this.evaluacionesFinales.indexOf(evaluacionFinalSelected); // obtenemos el indice
    this.evaluacionesFinales.splice(indice, 1);
  }

  add_instalacion(event: Event) {
    event.preventDefault();
    this.instalaciones.push(this.instalacionText);
    this.instalacionText = "";
  }

  delete_instalacion(instalacionSelected: any) {
    var indice = this.instalaciones.indexOf(instalacionSelected); // obtenemos el indice
    this.instalaciones.splice(indice, 1);
  }

  add_fase_teorica(event: Event) {
    event.preventDefault();
    this.fasesTeoricas.push(this.faseTeoricaText);
    this.faseTeoricaText = "";
  }

  delete_fase_teorica(faseTeoricaSelected: any) {
    var indice = this.fasesTeoricas.indexOf(faseTeoricaSelected); // obtenemos el indice
    this.fasesTeoricas.splice(indice, 1);
  }

  add_fase_practica(event: Event) {
    event.preventDefault();
    this.fasesPracticas.push(this.fasePracticaText);
    this.fasePracticaText = "";
  }

  delete_fase_practica(fasePracticaSelected: any) {
    var indice = this.fasesPracticas.indexOf(fasePracticaSelected); // obtenemos el indice
    this.fasesPracticas.splice(indice, 1);
  }

  add_necesidad_planning(event: Event) {
    event.preventDefault();
    this.necesidades_planning.push(this.necesidad_planningText);
    this.necesidad_planningText = "";
  }

  delete_necesidad_planning(necesidades_planningSelected: any) {
    var indice = this.necesidades_planning.indexOf(necesidades_planningSelected); // obtenemos el indice
    this.necesidades_planning.splice(indice, 1);
  }

  showViaService(texto: any) {
    this.messageService.add({ severity: 'error', summary: 'Información', detail: 'Debe llenar el campo ' + texto });
  }

  myUploader(event) {
    var files = event.files;
    var reader = new FileReader();
    if (files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        var base64Large: any = reader.result;
        this.imagenCurso = base64Large;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  public formatoCampo(valor, restriccion, caracteres, tipo) {
    var out = '';
    var filtro = '' + restriccion + '';
    for (var i = 0; i < valor.length; i++) {
      if (filtro.indexOf(valor.charAt(i)) != -1) {
        if (out.length >= caracteres) {
          out.substr(0, caracteres);
        } else {
          out += valor.charAt(i);
        }
      }
    }
    return (tipo == 1) ? out.toUpperCase() : out;
  }

  public guardarCurso() {

    this._spinner.show();
    
    this.curso.lista_necesidades = this.necesidades == null ? '' : JSON.stringify(this.necesidades);
    this.curso.lista_requisitos = this.requisitos == null ? '' : JSON.stringify(this.requisitos);
    this.curso.lista_prerequisitos = this.prerequisitos == null ? '' : JSON.stringify(this.prerequisitos);
    this.curso.lista_temas_principales = this.temasPrincipales == null ? '' : JSON.stringify(this.temasPrincipales);
    this.curso.lista_temas_secundarios = this.temasSecundarios == null ? '' : JSON.stringify(this.temasSecundarios);
    this.curso.lista_temas_transversales = this.temasTransversales == null ? '' : JSON.stringify(this.temasTransversales);
    this.curso.lista_evaluaciones_diagnosticas = this.evaluacionesDiagnosticas == null ? '' : JSON.stringify(this.evaluacionesDiagnosticas);
    this.curso.lista_evaluaciones_procesos = this.evaluacionesProcesos == null ? '' : JSON.stringify(this.evaluacionesProcesos);
    this.curso.lista_evaluaciones_finales = this.evaluacionesFinales == null ? '' : JSON.stringify(this.evaluacionesFinales);
    this.curso.lista_instalaciones = this.instalaciones == null ? '' : JSON.stringify(this.instalaciones);
    this.curso.lista_fases_teoricas = this.fasesTeoricas == null ? '' : JSON.stringify(this.fasesTeoricas);
    this.curso.lista_fases_practicas = this.fasesPracticas == null ? '' : JSON.stringify(this.fasesPracticas);
    this.curso.career = this.carreraSeleccionada == undefined ? 0 : this.carreraSeleccionada.id;
    this.curso.course_period = this.periodoSeleccionado == undefined ? 0 : this.periodoSeleccionado.id;
    this.curso.course_type = this.tipoCursoSeleccionado == undefined ? 0 : this.tipoCursoSeleccionado.id;
    this.curso.modality = this.modalidadSeleccionada == undefined ? 0 : this.modalidadSeleccionada.id;
    this.curso.participant_type = this.tipoParticipanteSeleccionado == undefined ? 0 : this.tipoParticipanteSeleccionado.id;
    this.curso.area = this.areaSeleccionada == undefined ? 0 : this.areaSeleccionada.id;
    this.curso.specialty = this.especialidadSeleccionada == undefined ? 0 : this.especialidadSeleccionada.id;
    this.curso.bibliographys = this.bibliografias == null ? '' : JSON.stringify(this.bibliografias);
    this.curso.cost = this.curso.cost == '' ? '00.00' : this.curso.cost;
    this.curso.free = this.value == undefined ? false : this.value;
    this.curso.photo = this.imagenCurso;

    this.cecyService.post("create", this.curso, "").subscribe(
      (res: any) => {
        console.log(res);
        if (res.msg.code == '200') {
          console.log('Curso guardado Exitosamente.');

          this.messageService.add({
            key: 'msgToast',
            severity: 'success',
            summary: res['msg']['summary'],
            detail: res['msg']['detail']
          });

          setTimeout(() => {
            this._router.navigate(['/cecy/courses']);
          }, 4000);

          this._spinner.hide();

        }
      },
      err => {
        console.log(err);
      }
    );


  }

  public actualizarCurso() {

    this._spinner.show();

    this.curso.lista_necesidades = this.necesidades == null ? '' : JSON.stringify(this.necesidades);
    this.curso.lista_requisitos = this.requisitos == null ? '' : JSON.stringify(this.requisitos);
    this.curso.lista_prerequisitos = this.prerequisitos == null ? '' : JSON.stringify(this.prerequisitos);
    this.curso.lista_temas_principales = this.temasPrincipales == null ? '' : JSON.stringify(this.temasPrincipales);
    this.curso.lista_temas_secundarios = this.temasSecundarios == null ? '' : JSON.stringify(this.temasSecundarios);
    this.curso.lista_temas_transversales = this.temasTransversales == null ? '' : JSON.stringify(this.temasTransversales);
    this.curso.lista_evaluaciones_diagnosticas = this.evaluacionesDiagnosticas == null ? '' : JSON.stringify(this.evaluacionesDiagnosticas);
    this.curso.lista_evaluaciones_procesos = this.evaluacionesProcesos == null ? '' : JSON.stringify(this.evaluacionesProcesos);
    this.curso.lista_evaluaciones_finales = this.evaluacionesFinales == null ? '' : JSON.stringify(this.evaluacionesFinales);
    this.curso.lista_instalaciones = this.instalaciones == null ? '' : JSON.stringify(this.instalaciones);
    this.curso.lista_fases_teoricas = this.fasesTeoricas == null ? '' : JSON.stringify(this.fasesTeoricas);
    this.curso.lista_fases_practicas = this.fasesPracticas == null ? '' : JSON.stringify(this.fasesPracticas);
    this.curso.career = this.carreraSeleccionada == undefined ? 0 : this.carreraSeleccionada.id;
    this.curso.course_period = this.periodoSeleccionado == undefined ? 0 : this.periodoSeleccionado.id;
    this.curso.course_type = this.tipoCursoSeleccionado == undefined ? 0 : this.tipoCursoSeleccionado.id;
    this.curso.modality = this.modalidadSeleccionada == undefined ? 0 : this.modalidadSeleccionada.id;
    this.curso.participant_type = this.tipoParticipanteSeleccionado == undefined ? 0 : this.tipoParticipanteSeleccionado.id;
    this.curso.area = this.areaSeleccionada == undefined ? 0 : this.areaSeleccionada.id;
    this.curso.specialty = this.especialidadSeleccionada == undefined ? 0 : this.especialidadSeleccionada.id;
    this.curso.bibliographys = this.bibliografias == null ? '' : JSON.stringify(this.bibliografias);
    this.curso.cost = this.curso.cost == '' ? '00.00' : this.curso.cost;
    this.curso.free = this.value == undefined ? false : this.value;
    this.curso.photo = this.imagenCurso;


    this.cecyService.post("update", this.curso, "").subscribe(
      (res: any) => {
        console.log(res);
        if (res.msg.code == '200') {
          console.log('Curso actualizado Exitosamente.');
          
          this.messageService.add({
            key: 'msgToast',
            severity: 'success',
            summary: res['msg']['summary'],
            detail: res['msg']['detail']
          });

          setTimeout(() => {
            this._router.navigate(['/cecy/courses']);
          }, 4000);

          this._spinner.hide();
        }
      },
      err => {
        console.log(err);
      }
    );


  }

  public validarFecha() {

    var fecha1 = moment(this.planning.fechaInicio);
    var fecha2 = moment(this.planning.fechaFinalizacion);
    this.planning.days = fecha2.diff(fecha1, 'days')

  }

  public guardarPlanificacion() {

    this.planning.course_id = this.tipoCursoSeleccionado == undefined ? 0 : this.tipoCursoSeleccionado.id;
    this.planning.fechaCreacion = moment(this.planning.fechaCreacion).format('YYYY-MM-DD');
    this.planning.school_period_id = this.periodoPlanificacionSeleccionado == undefined ? 0 : this.periodoPlanificacionSeleccionado.id;
    this.planning.teacher_id = this.profesorSeleccionado == undefined ? 0 : this.profesorSeleccionado.id;
    this.planning.lista_necesidades_planning = this.necesidades_planning == null ? '' : JSON.stringify(this.necesidades_planning);
    this.planning.fechaInicio = moment(this.planning.fechaInicio).format('YYYY-MM-DD');
    this.planning.fechaFinalizacion = moment(this.planning.fechaFinalizacion).format('YYYY-MM-DD');
    this.planning.fechaFinal = moment(this.planning.fechaFinal).format('YYYY-MM-DD');
    this.planning.capacity = this.curso.capacity;
    this.planning.develop_day_id = this.diaSeleccionado == undefined ? 0 : this.diaSeleccionado.id;
    this.planning.start_time_id = this.fechaInicioSeleccionado == undefined ? 0 : this.fechaInicioSeleccionado.id;
    this.planning.end_time_id = this.fechaFinSeleccionado == undefined ? 0 : this.fechaFinSeleccionado.id;
    this.planning.classroom_id = this.aulaSeleccionada == undefined ? 0 : this.aulaSeleccionada.id;
    this.planning.paralel_id = this.paraleloSeleccionado == undefined ? 0 : this.paraleloSeleccionado.id;
    this.planning.workday_type_id = this.jornadaSeleccionada == undefined ? 0 : this.jornadaSeleccionada.id;
    this.planning.instructor_id = this.instructorSeleccionado == undefined ? 0 : this.instructorSeleccionado.id;
    this.planning.status_cecy_id = this.estatusSeleccionado == undefined ? 0 : this.estatusSeleccionado.id;

    console.log('PLANIFICACIONNNNNN',this.planning);

    this.cecyService.post("planning/create", this.planning, "").subscribe(
      (res: any) => {
        console.log(res);
        if (res.msg.code == '200') {
          console.log('Planificación Agregada Exitosamente.');
          
          this.messageService.add({
            key: 'msgToast',
            severity: 'success',
            summary: res['msg']['summary'],
            detail: res['msg']['detail']
          });

          setTimeout(() => {
            this._router.navigate(['/cecy/courses']);
          }, 4000);

          this._spinner.hide();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}