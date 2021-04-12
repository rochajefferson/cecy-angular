import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CecyService } from 'src/app/services/cecy/cecy.service';
import {Requisito} from 'src/app/models/cecy/models.index'
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { TemaPrincipal, TemaSecundario, TemaTransaversal } from 'src/app/models/cecy/requisito';

@Component({
  selector: 'app-diseno-curricular',
  templateUrl: './diseno-curricular.component.html'
})
export class DisenoCurricularComponent implements OnInit {
//formulario
form_diseno: FormGroup;
form_requisito: FormGroup;
form_tema_principal : FormGroup;
form_tema_secundario : FormGroup;
form_tema_transversal : FormGroup;
// tabla requisitos
tabla_requisitos: any[];
requisitos:Requisito []= [];
requisito: Requisito;
//temas principales
tabla_principales: any [];
tema_principales : TemaPrincipal []=[];
tema_principal: TemaPrincipal;
//temas principales
tabla_secundarios: any [];
tema_secundarios : TemaSecundario []=[];
tema_secundario: TemaSecundario;
//temas trasversales
tabla_transversales: any [];
tema_transversales : TemaTransaversal []=[];
tema_transversal: TemaTransaversal;
//campos
specialties: SelectItem[];
aereas: SelectItem[];
url_combo = "combo";


constructor(private cecyService:CecyService, private formBuilder: FormBuilder) { 
  this.buildForm();
}

ngOnInit(): void {
  this.tabla_requisito();
  this.tabla_principal();
  this.tabla_secundario();
  this.tabla_transversal();
}

private buildForm() {
  this.form_diseno = this.formBuilder.group({
    aerea: ['',[Validators.required]],
    specialty: ['',[Validators.required]],
  });
  this.form_tema_principal = this.formBuilder.group({
    principal: ['',[Validators.required]],
  });
  this.form_tema_secundario = this.formBuilder.group({
    secundario: ['',[Validators.required]],
  });
  this.form_tema_transversal = this.formBuilder.group({
    transversal: ['',[Validators.required]],
  });
  this.form_requisito = this.formBuilder.group({
    requisito: ['',[Validators.required]],
  });
}

filter(event) {
  this.cecyService.getCombos(this.url_combo).subscribe(
    response => {
      this.specialties = [];
      this.aereas = [];
      const specialties = response['specialty'];
      const aereas = response['aerea'];
      for (const item of specialties) {
        const specialty = item.name;
        if (specialty.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
          this.specialties.push(specialty);
        }
      }
      for (const item of aereas) {
        const aerea = item.name;
        if (aerea.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
          this.aereas.push(aerea);
        }
      }
    },
    error => {
      console.log(error);
    });
}

tabla_requisito(){
  this.tabla_requisitos = [
    { field: 'requisitos_diseno', header: 'requisitos'},
  ]
}
tabla_principal(){
  this.tabla_principales=[
   {field:'temas_principales', header: 'temas principales'}
  ]
}
tabla_secundario(){
  this.tabla_secundarios=[
   {field:'temas_secundarios', header: 'temas secundarios'}
  ]
}
tabla_transversal(){
  this.tabla_transversales=[
   {field:'temas_transversales', header: 'temas transversales'}
  ]
}

add_requisito(event: Event){
  event.preventDefault();
  const values = this.form_requisito.value;
      this.requisitos.push(this.requisito = {
        requisitos_diseno: values.requisito,
      });
      this.form_requisito.controls['requisito'].setValue('');
}

add_principal(event: Event){
  event.preventDefault();
  const values = this.form_tema_principal.value;
  this.tema_principales.push(this.tema_principal = {
    temas_principales : values.principal,
    });
    this.form_tema_principal.controls['principal'].setValue('');
}
add_secundario(event: Event){
  event.preventDefault();
  const values = this.form_tema_secundario.value;
  this.tema_secundarios.push(this.tema_secundario = {
    temas_secundarios : values.secundario,
    });
    this.form_tema_secundario.controls['secundario'].setValue('');
}
add_transversal(event: Event){
  event.preventDefault();
  const values = this.form_tema_transversal.value;
  this.tema_transversales.push(this.tema_transversal = {
    temas_transversales : values.transversal,
    });
    this.form_tema_transversal.controls['transversal'].setValue('');
}
}
