import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CecyService } from 'src/app/services/cecy/cecy.service';

declare var $: any;

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  public identificacion : any;

  constructor(private messageService: MessageService,private cecyService: CecyService) { }

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
              $('#exampleModal').modal('toggle');
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


}
