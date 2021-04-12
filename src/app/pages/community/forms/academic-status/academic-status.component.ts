import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommunityService } from '../../../../services/community/community.service'

@Component({
  selector: 'app-estado-academico',
  templateUrl: './academic-status.component.html',
})
export class AcademicStatusComponent implements OnInit {

  //VARIABLES FORM CONTROL
  form: FormGroup;

  //COMBOS
  careers: SelectItem[];

  //URLS 
  urlcombo = "combo";

  constructor(private vinculacionService: CommunityService,
    private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      carrer: [''],
      aim: [''],
      cycle: [''],
      modality: [''],
      location: [''], // id parroquia
      lead_time: [''],
      delivery_date: [''],
      start_date: [''],
      end_date: [''],
    });
    this.form.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.calcularleadTime(value.start_date, value.end_date);
        this.setModalidad(value.carrer);
      });
  }


  // CAMBIAR FUNCION CUANDO YA VENGAN BIEN LOS DATOS 
  setModalidad(carrer) {
    this.vinculacionService.get(this.urlcombo).subscribe(
      response => {
        const careers = response['career'];
        careers.forEach(element => {
          if (carrer == element.name)
            this.form.controls['modality'].setValue(element.modality);
        });
      },
      error => {
        console.log(error);
      });

  }

  filterAssignedLines(event) {
    this.vinculacionService.get(this.urlcombo).subscribe(
      response => {
        this.careers = [];
        const careers = response['career'];
        for (const item of careers) {
          const brand = item.name;
          if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.careers.push(brand);
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  calcularleadTime(startDate, endDate) {
    if (startDate != undefined && startDate.length != 0
      && endDate != undefined && endDate.length != 0) {
      var start = transformDate(startDate);
      var end = transformDate(endDate);
      var leadTime = end - start;
      var months = (leadTime / (1000 * 60 * 60 * 24)) / 30;
      this.form.controls['lead_time'].setValue(Math.trunc(months) + ' meses');
    }
  }
}

function transformDate(date: Date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  var stringDate = year + '-' + month + '-' + day;
  var endDate = new Date(stringDate);
  return endDate.getTime();
}
