import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import { CecyService } from 'src/app/services/cecy/cecy.service';
import {Necesidad} from 'src/app/models/cecy/models.index'
import { Curso } from 'src/app/models/cecy/curso';


@Component({
  selector: 'app-datos-curso',
  templateUrl: './datos-curso.component.html'
})
export class DatosCursoComponent implements OnInit {
   //variables de control en el formulario
  form: FormGroup;
  form_necesidades: FormGroup;
  // tabla necesidad
  tabla_necesidades: any[];
  necesidades:Necesidad [] = [];
  necesidad: Necesidad;
   //campos
  participant_types : SelectItem[];
  modalities: SelectItem[];
  carrers: SelectItem[];
  days: SelectItem[];
  course_types: SelectItem[];
  url_combo = "combo";

  public curso:Curso;

  constructor(private cecyService:CecyService, private formBuilder: FormBuilder) {
    this.buildForm();
   }

  ngOnInit() {
    
    this.filter;
    this.tabla_necesidad();
    
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      cost: ['',[Validators.required]],
      free: ['',[Validators.required]],
      capacity: ['',[Validators.required]],
      modality: ['',[Validators.required]],
      career: ['',[Validators.required]],
      duration: ['',[Validators.required]],
      local_proposal: ['',[Validators.required]],
      summary: ['',[Validators.required]],
      day: ['',[Validators.required]],
      course_type: ['',[Validators.required]],
      participant_type: ['',[Validators.required]],
    });
    this.form_necesidades= this.formBuilder.group({
      necesidad: ['',[Validators.required]],
    });
  }

  filter(event: { query: string; }) {
    this.cecyService.getCombos(this.url_combo).subscribe(
      response => {

        console.log('Respuesta',response);

        this.carrers = [];
        const carrers = response['career'];

        this.days = [];
        this.modalities = [];
        
        this.course_types=[];
        this.participant_types=[];
        const days = response['day'];
        const modalities = response['modality'];
        
        const course_types = response['course_type'];
        const participant_types = response['participant_type'];
        for (const item of days) {
          const day = item.name;
          if (day.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.days.push(day);
          }
        }
        for (const item of modalities) {
          const modality = item.name;
          if (modality.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.modalities.push(modality);
            console.log(modality);
            
          }
        }
        for (const item of carrers) {
          const carr = item.name;
          if (carr.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.carrers.push(carr);
            console.log(carr);
            
          }
        }
        for (const item of course_types) {
          const course_type = item.name;
          if (course_type.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.course_types.push(course_type);
          }
        }
        for (const item of participant_types) {
          const participant_type = item.name;
          if (participant_type.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.participant_types.push(participant_type);
          }
        }
        
      },
      error => {
        console.log(error);
      });
  }
  
  tabla_necesidad(){
    this.tabla_necesidades = [
      { field: 'necesidades_cursos', header: 'Necesidad'},
    ]
  }
  add_necesidad(event:Event){
    event.preventDefault();
    const values = this.form_necesidades.value;
    this.necesidades.push(this.necesidad = {
      necesidades_cursos: values.necesidad,
    });
    this.form_necesidades.controls['necesidad'].setValue('');
    console.log(this.necesidades);
  }
  onSubmit(event:Event){
   // console.log(this.form.value);
  }
  
}