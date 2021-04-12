import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoordinatorTable } from '../../../../models/community/tables/coordinator-table'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-institucion-beneficiaria',
  templateUrl: './beneficiary-institution.component.html',
})
export class BeneficiaryInstitutionComponent implements OnInit {

  //VARIABLES FORM CONTROL
  form: FormGroup;

  //STEPS
  items: MenuItem[];
  activeIndexitems: Number;

  //TABLAS
  cols_coordinator: any[];
  coordinators: CoordinatorTable[] = [];
  coordinator: CoordinatorTable;

  //DIALOG
  display: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.steps();
    this.table_coordinator();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [''],
      location: [''],
      main_street: [''], //AÑADIR CAMPO 
      secondary_street: [''], //AÑADIR CAMPO
      // PREGUNTAR ESTO 
      //ubicacion: [''],
      direct_beneficiaries: [''],
      indirect_beneficiaries: [''],
      function: [''],
      coordinator_name: ['', [Validators.required]],
      coordinator_postition: ['', [Validators.required]],
      coordinator_funtion: ['', [Validators.required]],
    });
  }

  steps() {
    this.activeIndexitems = 0;
    this.items = [{
      label: 'Archivos adjuntos',
      command: (event: any) => {
        this.activeIndexitems = 0;
      }
    },
    {
      label: 'Informacion general',
      command: (event: any) => {
        this.activeIndexitems = 1;
      }
    },
    {
      label: 'Informacion del coordinador',
      command: (event: any) => {
        this.activeIndexitems = 2;
      }
    },];
  }

  table_coordinator() {
    this.cols_coordinator = [
      { field: 'coordinator_name', header: 'Nombre completo' },
      { field: 'coordinator_postition', header: 'Cargo institución' },
      { field: 'coordinator_funtion', header: 'Funciones comunidad' },
    ]
  }

  addcoordinator(event: Event) {
    event.preventDefault();
    const values = this.form.value;
    this.coordinators.push(this.coordinator = {
      coordinator_name: values.coordinator_name,
      coordinator_postition: values.coordinator_postition,
      coordinator_funtion: values.coordinator_funtion,
    });
    this.form.controls['coordinator_name'].setValue('');
    this.form.controls['coordinator_postition'].setValue('');
    this.form.controls['coordinator_funtion'].setValue('');
  }
}
