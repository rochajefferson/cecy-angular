import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { CecyService } from 'src/app/services/cecy/cecy.service';

declare var $: any;
var moment = require('moment'); // require

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  public identificacion : any;
  list_identification_types = [];
  list_ethnic_origins = [];
  list_blood_types = [];
  list_sexs = [];
  list_genders = [];
  list_participants_type = [{'id':1,'name':'ESTUDIANTE'},{'id':2,'name':'PROFESOR'}];

  tipoIdentificacionSeleccionado: any;
  tipoEtniaSeleccionada: any;
  tipoSanguineoSeleccionado: any;
  tipoSexoSeleccionado: any;
  tipoGeneroSeleccionado: any;
  tipoParticipanteSeleccionado: any;

  public usuario: any = {
    user_id: 0,
    ethnic_origin_id : 0,
    identification_type_id : 0,
    sex_id : 0,
    gender_id : 0,
    username : '',
    identification : '',
    first_name : '',
    second_name : '',
    first_lastname : '',
    second_lastname : '',
    personal_email : '',
    birthdate : '',
    blood_type_id : 0,
    email : '',
    participant_type:'',
  }

  constructor(private messageService: MessageService,private cecyService: CecyService,private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  public verificarIdentificacion(){
    if(this.identificacion == '' || this.identificacion == undefined || this.identificacion == null || this.identificacion.length != 10){
      this.messageService.add({
        key: 'msgToast',
        severity: 'error',
        summary: 'Error',
        detail: 'Debe llenar el campo identificación.'
      });
    } else {
      var datos = {
        identificacion : this.identificacion
      }
      console.log('datos',datos);
      this.cecyService.post("participant/verified", datos, "").subscribe(
        (res: any) => {
          console.log(res);
          if(res.data.length == 0){
            this.messageService.add({
              key: 'msgToast',
              severity: 'info',
              summary: 'Información Usuario No Existe',
              detail: 'Debe llenar el formulario para ingresar el nuevo participante.'
            });
            setTimeout(() => {
              this.cargarModal();
            }, 4000);
          }else if(res.data.length == 1){
            this.messageService.add({
              key: 'msgToast',
              severity: 'success',
              summary: 'Consulta Exitosa',
              detail: 'El participante que intenta ingresar ya se encuentra registrado en la plataforma.'
            });
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  public cargarModal(){
    this.cecyService.get("participant/load", "").subscribe(
      (res: any) => {
        console.log(res);
        
        this.list_identification_types = res.identification_type; 
        this.list_ethnic_origins = res.ethnic_origin; 
        this.list_blood_types = res.blood_type; 
        this.list_sexs = res.sex; 
        this.list_genders = res.gender;
        this.tipoParticipanteSeleccionado = '';
        this.tipoSexoSeleccionado = '';
        this.tipoGeneroSeleccionado = '';
        this.tipoSanguineoSeleccionado = '';
        this.tipoEtniaSeleccionada = '';
        this.tipoIdentificacionSeleccionado = '';

        this.limpiarDatos();

        this.usuario.identification = this.identificacion;


        $('#exampleModal').modal('show');
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public guardarParticipante(){

    this._spinner.show();
    this.usuario.identification_type_id = this.tipoIdentificacionSeleccionado == undefined ? 0 : this.tipoIdentificacionSeleccionado.id;
    this.usuario.ethnic_origin_id = this.tipoEtniaSeleccionada == undefined ? 0 : this.tipoEtniaSeleccionada.id;
    this.usuario.blood_type_id = this.tipoSanguineoSeleccionado == undefined ? 0 : this.tipoSanguineoSeleccionado.id;
    this.usuario.sex_id = this.tipoSexoSeleccionado == undefined ? 0 : this.tipoSexoSeleccionado.id;
    this.usuario.gender_id = this.tipoGeneroSeleccionado == undefined ? 0 : this.tipoGeneroSeleccionado.id;
    this.usuario.participant_type = this.tipoParticipanteSeleccionado == undefined ? '' : this.tipoParticipanteSeleccionado.name;
    this.usuario.username = this.usuario.first_name + ' ' + this.usuario.second_name + ' ' + this.usuario.first_lastname + ' ' + this.usuario.second_lastname;
    this.usuario.birthdate = moment(this.usuario.birthdate).format('YYYY-MM-DD');

    console.log(this.usuario);

    this.cecyService.post("participant/create", this.usuario, "").subscribe(
      (res: any) => {
        console.log('RESPUESTA',res);
        if (res.msg.code == '200') {

          this._spinner.hide();
          this.cerrarModal();
        
          this.messageService.add({
            key: 'msgToast',
            severity: 'success',
            summary: res['msg']['summary'],
            detail: res['msg']['detail']
          });
          
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
            detail: 'Los datos que está ingresando ya se encunentran registrador en nuestra plataforma..'
          });

        }
      }
    );

  }

  cerrarModal(){
    this.identificacion = '';
    $('#exampleModal').modal('hide');
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

  public limpiarDatos(){
    this.usuario = {
      user_id: 0,
      ethnic_origin_id : 0,
      identification_type_id : 0,
      sex_id : 0,
      gender_id : 0,
      username : '',
      identification : '',
      first_name : '',
      second_name : '',
      first_lastname : '',
      second_lastname : '',
      personal_email : '',
      birthdate : '',
      blood_type_id : 0,
      email : '',
      participant_type:'',
    }
  }


}
