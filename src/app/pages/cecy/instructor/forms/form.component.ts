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
    abbreviation: '',
    place: '',
    resume: '',
    career_id: '',
    teacher: '',
    course_period_id: '',
    user_id: 0,
    username: '',
    course_type: '',
    modality: '',
    paralel: '',
    end_time: '',
    start_time: '',
    day: '',
    participant_type: '',
    list_needs: '',
    photo: '',
    workday_type: '',
    area: '',
    specialty: '',
    status_cecy: '',
    list_requeriments: '',
    list_prerequisites: '',
    list_main_topics: '',
    list_subtopics: '',
    list_cross_topics: '',
    list_evaluations_diagnostic: '',
    list_evaluations_process: '',
    list_evaluations_final: '',
    practice_hours: '',
    theory_hours: '',
    list_bibliographic: '',
    list_facilities: '',
    list_phase_theore: '',
    list_phase_practical: '',
    observation: '',
    objective: '',
    project: '',
    list_required_installing_sources: '',
    list_practice_required_resources: '',
    list_aimtheory_required_resources: '',
    list_learning_teaching_strategy: '',
    list_teaching_strategies: '',    

  }

  public planning: any = {
    course_id: 0,
    planning_id: 0,
    code: '',
    dateCreation: '',
    school_period_id: '',
    teacher_id: '',
    list_needs_planning: ''
  }

  public plannig_details: any = {
    course_id: 0,
    planning_id: 0,
    plannig_details_id: 0,
    dateStart: '',
    dateEnd: '',
    dateFinal: '',
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

  list_carrer = [];
  list_school_period = [];
  list_classroom = [];
  list_academic_period = [];
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
  list_workday_type = [];
  list_courses_existing = [];
  list_planning_details = [];

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

  recursosRequeridos: Requisito[] = [];
  recursoText: any;

  recursosPracticas: Requisito[] = [];
  recursoPracticaText: any;

  recursosTeoricos: Requisito[] = [];
  recursoTeoricoText: any;

  estrategiasAprendizajes: Requisito[] = [];
  estrategiaAprendizajeText: any;

  estrategiasEnsenanzas: Requisito[] = [];
  estrategiaEnsenanzaText: any;

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

  botonGuardarPlanificacion = true;
  botonModificarPlanificacion = false;

  variableConfiguracion: any;
  variableVisualizacion = false;
  variableVisualizacionPlanificacion = false;

  visualizarPlanificacion = false;
  visualizarDetallePlanificacion = false;
  visualizarDetallePlanificacionView = true;

  idCurso: any;
  idPlanning: any;

  minDate : Date;

  bloquearCodigoCurso = true;

  constructor(
    private cecyService: CecyService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private _router: Router,
    private globales: GlobalsService,
    public activatedRouter: ActivatedRoute,
    private _spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.planning.dateCreation = new Date();
    this.getLocalStorage();
    this.minDate = new Date();
    console.log('minDate',this.minDate)
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
      this.idCurso = this.activatedRouter.snapshot.params.id;
      this.variableConfiguracion = this.activatedRouter.snapshot.url[0].path == null ? '' : this.activatedRouter.snapshot.url[0].path;

      console.log('variableConfiguracion', this.variableConfiguracion);
      console.log('idCurso', this.idCurso);

      if (this.role.id == 3) {
        this.visualizarPlanificacion = false;
      } else if (this.role.id == 12) {
        this.visualizarPlanificacion = true;
      }

      if (this.idCurso == undefined) {
        this.listarCombos();
        this.botonGuardar = true;
        this.botonModificar = false;
        this.variableVisualizacion = false;
        this.bloquearCodigoCurso = true;
      } else if (this.idCurso != undefined && this.variableConfiguracion == 'edit') {
        this.cargarDatosFormulario(this.idCurso);
        this.botonGuardar = false;
        this.botonModificar = true;
        this.variableVisualizacion = false;
        this.variableVisualizacionPlanificacion = true;
        this.bloquearCodigoCurso = true;
      } else if (this.idCurso != undefined && this.variableConfiguracion == 'view') {
        this.cargarDatosFormulario(this.idCurso);
        this.botonGuardar = false;
        this.botonModificar = false;
        this.variableVisualizacion = true;
        this.variableVisualizacionPlanificacion = true;
        this.bloquearCodigoCurso = true;
      } else if (this.idCurso != undefined && this.variableConfiguracion == 'planning-curso') {
        this.cargarDatosFormulario(this.idCurso);
        this.botonGuardar = false;
        this.botonModificar = false;
        this.botonGuardarPlanificacion = false;
        this.botonModificarPlanificacion = false;
        this.variableVisualizacionPlanificacion = true;
        this.variableVisualizacion = true;
      } else if (this.idCurso != undefined && this.variableConfiguracion == 'planning') {
        this.cargarDatosFormulario(this.idCurso);
        this.botonGuardar = false;
        this.botonModificar = false;
        this.variableVisualizacion = true;
        this.bloquearCodigoCurso = false;
      } else if (this.idCurso != undefined && this.variableConfiguracion == 'planning-view') {
        this.cargarDatosFormularioPlanning(this.idCurso);
        this.botonGuardar = false;
        this.botonModificar = false;
        this.botonGuardarPlanificacion = false;
        this.botonModificarPlanificacion = false;
        this.variableVisualizacion = true;
        this.visualizarDetallePlanificacion = false;
        this.variableVisualizacionPlanificacion = true;
      } else if (this.idCurso != undefined && this.variableConfiguracion == 'planning-edit') {
        this.cargarDatosFormularioPlanning(this.idCurso);
        this.botonGuardar = false;
        this.botonModificar = false;
        this.botonGuardarPlanificacion = false;
        this.botonModificarPlanificacion = true;
        this.variableVisualizacion = true;
        this.variableVisualizacionPlanificacion = false;
        this.visualizarDetallePlanificacion = true;
        this.bloquearCodigoCurso = false;
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
        this.curso.code = cursoRecuperado.code;
        this.nombreDocente = cursoRecuperado.username;
        this.imagenCurso = cursoRecuperado.photo;
        this.necesidades = JSON.parse(cursoRecuperado.list_needs);
        this.requisitos = JSON.parse(cursoRecuperado.list_requeriments);
        this.prerequisitos = JSON.parse(cursoRecuperado.list_prerequisites);
        this.temasPrincipales = JSON.parse(cursoRecuperado.list_main_topics);
        this.temasSecundarios = JSON.parse(cursoRecuperado.list_subtopics);
        this.temasTransversales = JSON.parse(cursoRecuperado.list_cross_topics);
        this.recursosRequeridos = JSON.parse(cursoRecuperado.list_required_installing_sources);
        this.evaluacionesDiagnosticas = JSON.parse(cursoRecuperado.list_evaluations_diagnostic);
        this.evaluacionesProcesos = JSON.parse(cursoRecuperado.list_evaluations_process);
        this.evaluacionesFinales = JSON.parse(cursoRecuperado.list_evaluations_final);   
        this.instalaciones = JSON.parse(cursoRecuperado.list_facilities);     
        this.recursosPracticas = JSON.parse(cursoRecuperado.list_practice_required_resources);
        this.recursosTeoricos = JSON.parse(cursoRecuperado.list_aimtheory_required_resources);
        this.estrategiasAprendizajes = JSON.parse(cursoRecuperado.list_learning_teaching_strategy);
        this.estrategiasEnsenanzas = JSON.parse(cursoRecuperado.list_teaching_strategies);
        this.fasesTeoricas = JSON.parse(cursoRecuperado.list_phase_theore);
        this.fasesPracticas = JSON.parse(cursoRecuperado.list_phase_practical);
        this.bibliografias = JSON.parse(cursoRecuperado.list_bibliographic);      
        this.listarCombosEdicion(cursoRecuperado); 
     
      },
      err => {
        console.log(err);
      }
    );
  }

  public cargarDatosFormularioPlanning(idCurso: any) {
    var data: any = {
      id: idCurso
    }
    this.cecyService.post("planning/edit", data, "").subscribe(
      (res: any) => {
        console.log(res);
        var cursoRecuperado = res[0];
        this.idPlanning = cursoRecuperado.planning_id;
        this.curso.name = cursoRecuperado.name;   
        this.curso.code = cursoRecuperado.code;   
        this.curso.cost = cursoRecuperado.cost;
        this.curso.hours_duration = cursoRecuperado.hours_duration;
        this.curso.capacity = cursoRecuperado.capacity;
        this.curso.place = cursoRecuperado.place;
        this.curso.resume = cursoRecuperado.resume;
        this.curso.theory_hours = cursoRecuperado.theory_hours;
        this.curso.practice_hours = cursoRecuperado.practice_hours;
        this.curso.observation = cursoRecuperado.observation;
        this.curso.objective = cursoRecuperado.objective;
        this.curso.project = cursoRecuperado.project;
        this.planning.code = cursoRecuperado.code;
        this.nombreDocente = cursoRecuperado.username;
        this.imagenCurso = cursoRecuperado.photo;
        this.necesidades = JSON.parse(cursoRecuperado.list_needs);
        this.necesidades_planning = JSON.parse(cursoRecuperado.list_needs_planning);
        this.requisitos = JSON.parse(cursoRecuperado.list_requeriments);
        this.prerequisitos = JSON.parse(cursoRecuperado.list_prerequisites);
        this.temasPrincipales = JSON.parse(cursoRecuperado.list_main_topics);
        this.temasSecundarios = JSON.parse(cursoRecuperado.list_subtopics);
        this.temasTransversales = JSON.parse(cursoRecuperado.list_cross_topics);
        this.evaluacionesDiagnosticas = JSON.parse(cursoRecuperado.list_evaluations_diagnostic);
        this.evaluacionesProcesos = JSON.parse(cursoRecuperado.list_evaluations_process);
        this.evaluacionesFinales = JSON.parse(cursoRecuperado.list_evaluations_final);
        this.instalaciones = JSON.parse(cursoRecuperado.list_facilities);
        this.recursosRequeridos = JSON.parse(cursoRecuperado.list_required_installing_sources);
        this.recursosPracticas = JSON.parse(cursoRecuperado.list_practice_required_resources);
        this.recursosTeoricos = JSON.parse(cursoRecuperado.list_aimtheory_required_resources);
        this.estrategiasAprendizajes = JSON.parse(cursoRecuperado.list_learning_teaching_strategy);
        this.estrategiasEnsenanzas = JSON.parse(cursoRecuperado.list_teaching_strategies);
        this.fasesTeoricas = JSON.parse(cursoRecuperado.list_phase_theore);
        this.fasesPracticas = JSON.parse(cursoRecuperado.list_phase_practical);
        this.bibliografias = JSON.parse(cursoRecuperado.list_bibliographic);
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
        console.log(res);
        this.list_carrer = res.career;
        this.list_academic_period = res.academic_period;
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
        this.list_workday_type = res.workday_type;
        this.list_classroom = res.classroom;
        this.list_courses_existing = res.courses_existing;
      },
      err => {
        console.log(err);
      }
    );
  }

  public listarCombosEdicion(cursoSeleccionado: any) {
    this.cecyService.get("combo/edicion", "").subscribe(
      (response: any) => {
        console.log('COMBOS', response);
        this.newSelectedValues(response, cursoSeleccionado);
      },
      err => {
        console.log(err);
      }
    );
  }

  public newSelectedValues(list: any, cursoSeleccionado: any) {

    this.list_carrer = list.career;
    this.list_academic_period = list.academic_period;
    this.list_course_type = list.course_type;
    this.list_modality = list.modality;
    this.list_participant_type = list.participant_type;
    this.list_area = list.area;
    this.list_specialty = list.specialty;
    this.list_paralel = list.paralel;
    this.list_end_time = list.end_time;
    this.list_start_time = list.start_time;
    this.list_day = list.day;
    this.list_school_period = list.school_period;
    this.list_teacher = list.teacher;
    this.list_status_cecy = list.status_cecy;
    this.list_workday_type = list.workday_type;
    this.list_classroom = list.classroom;
    this.list_courses_existing = list.courses_existing;


    for (let i = 0; i < this.list_carrer.length; i++) {
      if (this.list_carrer[i].id == cursoSeleccionado.career_id) {
        this.carreraSeleccionada = this.list_carrer[i];
      }
    }

    for (let j = 0; j < this.list_academic_period.length; j++) {
      if (this.list_academic_period[j].id == cursoSeleccionado.course_period_id) {
        this.periodoSeleccionado = this.list_academic_period[j];
      }
    }

    for (let j = 0; j < this.list_course_type.length; j++) {
      if (this.list_course_type[j].id == cursoSeleccionado.course_type_id) {
        this.tipoCursoSeleccionado = this.list_course_type[j];
      }
    }

    for (let j = 0; j < this.list_modality.length; j++) {
      if (this.list_modality[j].id == cursoSeleccionado.modality_id) {
        this.modalidadSeleccionada = this.list_modality[j];
      }
    }

    for (let j = 0; j < this.list_participant_type.length; j++) {
      if (this.list_participant_type[j].id == cursoSeleccionado.participant_type_id) {
        this.tipoParticipanteSeleccionado = this.list_participant_type[j];
      }
    }

    for (let j = 0; j < this.list_area.length; j++) {
      if (this.list_area[j].id == cursoSeleccionado.area_id) {
        this.areaSeleccionada = this.list_area[j];
      }
    }


    for (let j = 0; j < this.list_specialty.length; j++) {
      if (this.list_specialty[j].id == cursoSeleccionado.specialty_id) {
        this.especialidadSeleccionada = this.list_specialty[j];
      }
    }   

    for (let j = 0; j < this.list_courses_existing.length; j++) {
      if (this.list_courses_existing[j].id == cursoSeleccionado.courses_existing_id) {
        this.prerequisitoSeleccionado = this.list_courses_existing[j];
      }
    }

    for (let j = 0; j < this.list_school_period.length; j++) {
      if (this.list_school_period[j].id == cursoSeleccionado.school_period_id) {
        this.periodoPlanificacionSeleccionado = this.list_school_period[j];
      }
    }

    for (let j = 0; j < this.list_teacher.length; j++) {
      if (this.list_teacher[j].id == cursoSeleccionado.teacher_id) {
        this.profesorSeleccionado = this.list_teacher[j];
      }
    }   

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

  add_recursos_requeridos(event: Event) {
    event.preventDefault();
    this.recursosRequeridos.push(this.recursoText);
    this.recursoText = "";
  }

  delete_recursos_requeridos(recursoRequeridoSelected: any) {
    var indice = this.recursosRequeridos.indexOf(recursoRequeridoSelected); // obtenemos el indice
    this.recursosRequeridos.splice(indice, 1);
  }

  add_recursos_practicas(event: Event) {
    event.preventDefault();
    this.recursosPracticas.push(this.recursoPracticaText);
    this.recursoPracticaText = "";
  }

  delete_recursos_practicas(recursoPracticaSelected: any) {
    var indice = this.recursosPracticas.indexOf(recursoPracticaSelected); // obtenemos el indice
    this.recursosPracticas.splice(indice, 1);
  }

  add_recursos_teoricos(event: Event) {
    event.preventDefault();
    this.recursosTeoricos.push(this.recursoTeoricoText);
    this.recursoTeoricoText = "";
  }

  delete_recursos_teoricos(recursoTeoricoSelected: any) {
    var indice = this.recursosTeoricos.indexOf(recursoTeoricoSelected); // obtenemos el indice
    this.recursosTeoricos.splice(indice, 1);
  }

  add_estrategiasAprendizajes(event: Event) {
    event.preventDefault();
    this.estrategiasAprendizajes.push(this.estrategiaAprendizajeText);
    this.estrategiaAprendizajeText = "";
  }

  delete_estrategiasAprendizajes(estrategiaAprendizajeSelected: any) {
    var indice = this.estrategiasAprendizajes.indexOf(estrategiaAprendizajeSelected); // obtenemos el indice
    this.estrategiasAprendizajes.splice(indice, 1);
  }
  
  add_estrategiasEnsenanzas(event: Event) {
    event.preventDefault();
    this.estrategiasEnsenanzas.push(this.estrategiaEnsenanzaText);
    this.estrategiaEnsenanzaText = "";
  }

  delete_estrategiasEnsenanzas(estrategiaEnsenanzaSelected: any) {
    var indice = this.estrategiasEnsenanzas.indexOf(estrategiaEnsenanzaSelected); // obtenemos el indice
    this.estrategiasEnsenanzas.splice(indice, 1);
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

    this.curso.list_needs = this.necesidades == null ? '' : JSON.stringify(this.necesidades);
    this.curso.list_requeriments = this.requisitos == null ? '' : JSON.stringify(this.requisitos);
    this.curso.list_prerequisites = this.prerequisitos == null ? '' : JSON.stringify(this.prerequisitos);
    this.curso.list_main_topics = this.temasPrincipales == null ? '' : JSON.stringify(this.temasPrincipales);
    this.curso.list_subtopics = this.temasSecundarios == null ? '' : JSON.stringify(this.temasSecundarios);
    this.curso.list_cross_topics = this.temasTransversales == null ? '' : JSON.stringify(this.temasTransversales);
    this.curso.list_evaluations_diagnostic = this.evaluacionesDiagnosticas == null ? '' : JSON.stringify(this.evaluacionesDiagnosticas);
    this.curso.list_evaluations_process = this.evaluacionesProcesos == null ? '' : JSON.stringify(this.evaluacionesProcesos);
    this.curso.list_evaluations_final = this.evaluacionesFinales == null ? '' : JSON.stringify(this.evaluacionesFinales);
    this.curso.list_facilities = this.instalaciones == null ? '' : JSON.stringify(this.instalaciones);
    this.curso.list_phase_theore = this.fasesTeoricas == null ? '' : JSON.stringify(this.fasesTeoricas);
    this.curso.list_phase_practical = this.fasesPracticas == null ? '' : JSON.stringify(this.fasesPracticas);
    this.curso.career_id = this.carreraSeleccionada == undefined ? 0 : this.carreraSeleccionada.id;
    this.curso.course_period_id = this.periodoSeleccionado == undefined ? 0 : this.periodoSeleccionado.id;
    this.curso.course_type = this.tipoCursoSeleccionado == undefined ? 0 : this.tipoCursoSeleccionado.id;
    this.curso.modality = this.modalidadSeleccionada == undefined ? 0 : this.modalidadSeleccionada.id;
    this.curso.participant_type = this.tipoParticipanteSeleccionado == undefined ? 0 : this.tipoParticipanteSeleccionado.id;
    this.curso.area = this.areaSeleccionada == undefined ? 0 : this.areaSeleccionada.id;
    this.curso.specialty = this.especialidadSeleccionada == undefined ? 0 : this.especialidadSeleccionada.id;
    this.curso.list_bibliographic = this.bibliografias == null ? '' : JSON.stringify(this.bibliografias);
    this.curso.list_required_installing_sources = this.recursosRequeridos == null ? '' : JSON.stringify(this.recursosRequeridos);
    this.curso.list_practice_required_resources = this.recursosPracticas == null ? '' : JSON.stringify(this.recursosPracticas);
    this.curso.list_aimtheory_required_resources = this.recursosTeoricos == null ? '' : JSON.stringify(this.recursosTeoricos);
    this.curso.list_learning_teaching_strategy = this.estrategiasAprendizajes == null ? '' : JSON.stringify(this.estrategiasAprendizajes);
    this.curso.list_teaching_strategies = this.estrategiasEnsenanzas == null ? '' : JSON.stringify(this.estrategiasEnsenanzas);
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
        this._spinner.hide();
        console.log(err);
        if(err.status == 400){
          this.messageService.add({
            key: 'msgToast',
            severity: 'error',
            summary: 'Información',
            detail: 'El curso que intenta crear ya se encuentra registrado en nuestra plataforma.'
          });

        }
      }
    );


  }

  public actualizarCurso() {

    this._spinner.show();

    this.curso.list_needs = this.necesidades == null ? '' : JSON.stringify(this.necesidades);
    this.curso.list_requeriments = this.requisitos == null ? '' : JSON.stringify(this.requisitos);
    this.curso.list_prerequisites = this.prerequisitos == null ? '' : JSON.stringify(this.prerequisitos);
    this.curso.list_main_topics = this.temasPrincipales == null ? '' : JSON.stringify(this.temasPrincipales);
    this.curso.list_subtopics = this.temasSecundarios == null ? '' : JSON.stringify(this.temasSecundarios);
    this.curso.list_cross_topics = this.temasTransversales == null ? '' : JSON.stringify(this.temasTransversales);
    this.curso.list_evaluations_diagnostic = this.evaluacionesDiagnosticas == null ? '' : JSON.stringify(this.evaluacionesDiagnosticas);
    this.curso.list_evaluations_process = this.evaluacionesProcesos == null ? '' : JSON.stringify(this.evaluacionesProcesos);
    this.curso.list_evaluations_final = this.evaluacionesFinales == null ? '' : JSON.stringify(this.evaluacionesFinales);
    this.curso.list_facilities = this.instalaciones == null ? '' : JSON.stringify(this.instalaciones);
    this.curso.list_phase_theore = this.fasesTeoricas == null ? '' : JSON.stringify(this.fasesTeoricas);
    this.curso.list_phase_practical = this.fasesPracticas == null ? '' : JSON.stringify(this.fasesPracticas);
    this.curso.career_id = this.carreraSeleccionada == undefined ? 0 : this.carreraSeleccionada.id;
    this.curso.course_period_id = this.periodoSeleccionado == undefined ? 0 : this.periodoSeleccionado.id;
    this.curso.course_type = this.tipoCursoSeleccionado == undefined ? 0 : this.tipoCursoSeleccionado.id;
    this.curso.modality = this.modalidadSeleccionada == undefined ? 0 : this.modalidadSeleccionada.id;
    this.curso.participant_type = this.tipoParticipanteSeleccionado == undefined ? 0 : this.tipoParticipanteSeleccionado.id;
    this.curso.area = this.areaSeleccionada == undefined ? 0 : this.areaSeleccionada.id;
    this.curso.specialty = this.especialidadSeleccionada == undefined ? 0 : this.especialidadSeleccionada.id;
    this.curso.list_bibliographic = this.bibliografias == null ? '' : JSON.stringify(this.bibliografias);
    this.curso.list_required_installing_sources = this.recursosRequeridos == null ? '' : JSON.stringify(this.recursosRequeridos);
    this.curso.list_practice_required_resources = this.recursosPracticas == null ? '' : JSON.stringify(this.recursosPracticas);
    this.curso.list_aimtheory_required_resources = this.recursosTeoricos == null ? '' : JSON.stringify(this.recursosTeoricos);
    this.curso.list_learning_teaching_strategy = this.estrategiasAprendizajes == null ? '' : JSON.stringify(this.estrategiasAprendizajes);
    this.curso.list_teaching_strategies = this.estrategiasEnsenanzas == null ? '' : JSON.stringify(this.estrategiasEnsenanzas);
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

    var fecha1 = moment(this.plannig_details.dateStart);
    var fecha2 = moment(this.plannig_details.dateEnd);
    this.plannig_details.dateFinal = this.plannig_details.dateEnd;
    this.plannig_details.capacity = this.curso.capacity;
    this.plannig_details.days = fecha2.diff(fecha1, 'days') + 1;

  }

  public guardarPlanificacion() {

    this.planning.course_id = this.idCurso == undefined ? 0 : this.idCurso;
    this.planning.dateCreation = moment(this.planning.dateCreation).format('YYYY-MM-DD');
    this.planning.school_period_id = this.periodoPlanificacionSeleccionado == undefined ? 0 : this.periodoPlanificacionSeleccionado.id;
    this.planning.teacher_id = this.profesorSeleccionado == undefined ? 0 : this.profesorSeleccionado.id;
    this.planning.list_needs_planning = this.necesidades_planning == null ? '' : JSON.stringify(this.necesidades_planning);

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

  public actualizarPlanificacion() {

    this._spinner.show();

    this.planning.planning_id = this.idPlanning == undefined ? 0 : this.idPlanning;
    this.planning.course_id = this.idCurso == undefined ? 0 : this.idCurso;
    this.planning.dateCreation = moment(this.planning.dateCreation).format('YYYY-MM-DD');
    this.planning.school_period_id = this.periodoPlanificacionSeleccionado == undefined ? 0 : this.periodoPlanificacionSeleccionado.id;
    this.planning.teacher_id = this.profesorSeleccionado == undefined ? 0 : this.profesorSeleccionado.id;
    this.planning.list_needs_planning = this.necesidades_planning == null ? '' : JSON.stringify(this.necesidades_planning);

    this.cecyService.post("planning/update", this.planning, "").subscribe(
      (res: any) => {
        console.log(res);
        if (res.msg.code == '200') {
          console.log('Planificación Actualizada Exitosamente.');

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

  public guardarDetallePlanificacion() {
    this._spinner.show();
    this.plannig_details.course_id = this.idCurso == undefined ? 0 : this.idCurso;
    this.plannig_details.planning_id = this.idPlanning == undefined ? 0 : this.idPlanning;
    this.plannig_details.dateStart = moment(this.plannig_details.dateStart).format('YYYY-MM-DD');
    this.plannig_details.dateFinal = moment(this.plannig_details.dateFinal).format('YYYY-MM-DD');
    this.plannig_details.dateEnd = moment(this.plannig_details.dateEnd).format('YYYY-MM-DD');
    this.plannig_details.classroom_id = this.aulaSeleccionada == undefined ? 0 : this.aulaSeleccionada.id;
    this.plannig_details.develop_day_id = this.diaSeleccionado == undefined ? 0 : this.diaSeleccionado.id;
    this.plannig_details.start_time_id = this.fechaInicioSeleccionado == undefined ? 0 : this.fechaInicioSeleccionado.id;
    this.plannig_details.end_time_id = this.fechaFinSeleccionado == undefined ? 0 : this.fechaFinSeleccionado.id;
    this.plannig_details.workday_type_id = this.jornadaSeleccionada == undefined ? 0 : this.jornadaSeleccionada.id;
    this.plannig_details.paralel_id = this.paraleloSeleccionado == undefined ? 0 : this.paraleloSeleccionado.id;
    this.plannig_details.instructor_id = this.instructorSeleccionado == undefined ? 0 : this.instructorSeleccionado.id;
    this.plannig_details.status_cecy_id = this.estatusSeleccionado == undefined ? 0 : this.estatusSeleccionado.id;


    this.cecyService.post("plannig_details/create", this.plannig_details, "").subscribe(
      (res: any) => {
        console.log(res);
        if (res.msg.code == '200') {
          console.log('Detalle Planificación Agregado Exitosamente.');
          $('#exampleModal').modal('toggle')
          this._spinner.hide();

          this.messageService.add({
            key: 'msgToast',
            severity: 'success',
            summary: res['msg']['summary'],
            detail: res['msg']['detail']
          });
          
          this.listarDetallesPlanificacion();
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  public handleChange(e) {   
    var index = e.index;
    console.log('handleChange',index);
    if(index == 1){
      console.log(this.curso.capacity);
      if(this.curso.capacity == ''){
        this.messageService.add({
          key: 'msgToast',
          severity: 'warn',
          summary: 'Alerta',
          detail: 'El campo capacidad es requerido'
        });
      } else if(this.curso.place == ''){
        this.messageService.add({
          key: 'msgToast',
          severity: 'warn',
          summary: 'Alerta',
          detail: 'El campo lugar es requerido'
        });
      }

    } else
    if (index == 7) {
      this.listarDetallesPlanificacion();
    }
  }

  public listarDetallesPlanificacion(){
    var datos : any = {
      'id' : this.idCurso
    }
    this.cecyService.post("plannig_details/list", datos,"").subscribe(
      (res: any) => {
        console.log(res);
        var lista_detalles_recuperados = res;

        for (let i = 0; i < lista_detalles_recuperados.length; i++) {
          console.log();
          for (let j = 0; j < this.list_teacher.length; j++) {
            if(lista_detalles_recuperados[i].instructor_id == this.list_teacher[j].id){
              lista_detalles_recuperados[i].instructor = this.list_teacher[j].user.username; 
            }
          }
          for (let j = 0; j < this.list_classroom.length; j++) {
            if(lista_detalles_recuperados[i].classroom_id == this.list_classroom[j].id){
              lista_detalles_recuperados[i].classroom = this.list_classroom[j].name; 
            }
          }
        }

        this.list_planning_details = lista_detalles_recuperados;
      },
      err => {
        console.log(err);
      }
    );
  }

  public modificarDetallePlanificacion(detalleSeleccionado:any){ 
    this.plannig_details = detalleSeleccionado;  

    for (let j = 0; j < this.list_paralel.length; j++) {
      if (this.list_paralel[j].id == this.plannig_details.paralel_id) {
        this.paraleloSeleccionado = this.list_paralel[j];
      }
    }

    for (let j = 0; j < this.list_day.length; j++) {
      if (this.list_day[j].id == this.plannig_details.develop_day_id) {
        this.diaSeleccionado = this.list_day[j];
      }
    }       

    for (let j = 0; j < this.list_status_cecy.length; j++) {
      if (this.list_status_cecy[j].id == this.plannig_details.status_cecy_id) {
        this.estatusSeleccionado = this.list_status_cecy[j];
      }
    }

    for (let j = 0; j < this.list_classroom.length; j++) {
      if (this.list_classroom[j].id == this.plannig_details.classroom_id) {
        this.aulaSeleccionada = this.list_classroom[j];
      }
    }

    for (let j = 0; j < this.list_start_time.length; j++) {
      if (this.list_start_time[j].id == this.plannig_details.start_time_id) {
        this.fechaInicioSeleccionado = this.list_start_time[j];
      }
    }

    
    for (let j = 0; j < this.list_end_time.length; j++) {
      if (this.list_end_time[j].id == this.plannig_details.end_time_id) {
        this.fechaFinSeleccionado = this.list_end_time[j];
      }
    } 

    for (let j = 0; j < this.list_teacher.length; j++) {
      if (this.list_teacher[j].id == this.plannig_details.instructor_id) {
        this.instructorSeleccionado = this.list_teacher[j];
      }
    }   

    for (let j = 0; j < this.list_workday_type.length; j++) {
      if (this.list_workday_type[j].id == this.plannig_details.workday_type_id) {
        this.jornadaSeleccionada = this.list_workday_type[j];
      }
    }       

    $('#exampleModalEdit').modal('toggle');
  }

  public viewDetallePlanificacion(detalleSeleccionado:any){ 
    this.plannig_details = detalleSeleccionado;  

    for (let j = 0; j < this.list_paralel.length; j++) {
      if (this.list_paralel[j].id == this.plannig_details.paralel_id) {
        this.paraleloSeleccionado = this.list_paralel[j];
      }
    }

    for (let j = 0; j < this.list_day.length; j++) {
      if (this.list_day[j].id == this.plannig_details.develop_day_id) {
        this.diaSeleccionado = this.list_day[j];
      }
    }       

    for (let j = 0; j < this.list_status_cecy.length; j++) {
      if (this.list_status_cecy[j].id == this.plannig_details.status_cecy_id) {
        this.estatusSeleccionado = this.list_status_cecy[j];
      }
    }

    for (let j = 0; j < this.list_classroom.length; j++) {
      if (this.list_classroom[j].id == this.plannig_details.classroom_id) {
        this.aulaSeleccionada = this.list_classroom[j];
      }
    }

    for (let j = 0; j < this.list_start_time.length; j++) {
      if (this.list_start_time[j].id == this.plannig_details.start_time_id) {
        this.fechaInicioSeleccionado = this.list_start_time[j];
      }
    }

    
    for (let j = 0; j < this.list_end_time.length; j++) {
      if (this.list_end_time[j].id == this.plannig_details.end_time_id) {
        this.fechaFinSeleccionado = this.list_end_time[j];
      }
    } 

    for (let j = 0; j < this.list_teacher.length; j++) {
      if (this.list_teacher[j].id == this.plannig_details.instructor_id) {
        this.instructorSeleccionado = this.list_teacher[j];
      }
    }   

    for (let j = 0; j < this.list_workday_type.length; j++) {
      if (this.list_workday_type[j].id == this.plannig_details.workday_type_id) {
        this.jornadaSeleccionada = this.list_workday_type[j];
      }
    }       

    $('#exampleModalView').modal('toggle');
  }

  public actualizarDetallePlanificacion() {

    this._spinner.show();
    this.plannig_details.course_id = this.idCurso == undefined ? 0 : this.idCurso;
    this.plannig_details.planning_id = this.idPlanning == undefined ? 0 : this.idPlanning;
    this.plannig_details.dateStart = moment(this.plannig_details.dateStart).format('YYYY-MM-DD');
    this.plannig_details.dateFinal = moment(this.plannig_details.dateFinal).format('YYYY-MM-DD');
    this.plannig_details.dateEnd = moment(this.plannig_details.dateEnd).format('YYYY-MM-DD');
    this.plannig_details.classroom_id = this.aulaSeleccionada == undefined ? 0 : this.aulaSeleccionada.id;
    this.plannig_details.develop_day_id = this.diaSeleccionado == undefined ? 0 : this.diaSeleccionado.id;
    this.plannig_details.start_time_id = this.fechaInicioSeleccionado == undefined ? 0 : this.fechaInicioSeleccionado.id;
    this.plannig_details.end_time_id = this.fechaFinSeleccionado == undefined ? 0 : this.fechaFinSeleccionado.id;
    this.plannig_details.workday_type_id = this.jornadaSeleccionada == undefined ? 0 : this.jornadaSeleccionada.id;
    this.plannig_details.paralel_id = this.paraleloSeleccionado == undefined ? 0 : this.paraleloSeleccionado.id;
    this.plannig_details.instructor_id = this.instructorSeleccionado == undefined ? 0 : this.instructorSeleccionado.id;
    this.plannig_details.status_cecy_id = this.estatusSeleccionado == undefined ? 0 : this.estatusSeleccionado.id;

    this.cecyService.post("plannig_details/update", this.plannig_details, "").subscribe(
      (res: any) => {
        console.log(res);
        if (res.msg.code == '200') {
          console.log('Detalle Planificación Agregado Exitosamente.');

          this._spinner.hide();
          $('#exampleModalEdit').modal('toggle');

          this.messageService.add({
            key: 'msgToast',
            severity: 'success',
            summary: res['msg']['summary'],
            detail: res['msg']['detail']
          });
          
          this.listarDetallesPlanificacion();
          
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  public eliminarDetallePlanificacion(detalleSeleccionado:any){
    this._spinner.show();

    var datos : any = {
      'id' : detalleSeleccionado.id
    }

    this.cecyService.post("plannig_details/delete", datos,"").subscribe(
      (res: any) => {
        console.log(res);
        if (res.msg.code == '200') {
          setTimeout(() => {
            this.messageService.add({
              key: 'msgToast',
              severity: 'success',
              summary: res['msg']['summary'],
              detail: res['msg']['detail']
            });
          }, 2500);
          this._spinner.hide();
          this.listarDetallesPlanificacion();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  public abrirModalDetalle(){
    this.plannig_details = {
      course_id: 0,
      planning_id: 0,
      plannig_details_id: 0,
      dateStart: '',
      dateEnd: '',
      dateFinal: '',
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
    this.diaSeleccionado = '';
    this.fechaInicioSeleccionado = '';
    this.fechaFinSeleccionado = '';
    this.aulaSeleccionada = '';
    this.paraleloSeleccionado = '';
    this.jornadaSeleccionada = '';
    this.instructorSeleccionado = '';
    this.estatusSeleccionado = '';
    $('#exampleModal').modal('show');
  }

}