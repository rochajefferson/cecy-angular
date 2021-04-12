import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import {ListboxModule} from 'primeng/listbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {StepsModule} from 'primeng/steps';
import {DialogModule} from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import {SliderModule} from 'primeng/slider';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {CheckboxModule} from 'primeng/checkbox';


import { from } from 'rxjs';
//COMPONENTES

import { FormRoutes } from './form.routing';
import { FormsComponent } from './form.component';
import { DatosCursoComponent } from './datos-curso/datos-curso.component';
import { DisenoCurricularComponent } from './diseno-curricular/diseno-curricular.component';
import { ObservacionesComponent } from './observaciones/observaciones.component';
import { EstrategiasComponent } from './estrategias/estrategias.component';
import { EntornoAprendizajeComponent } from './entorno-aprendizaje/entorno-aprendizaje.component'
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalsService } from 'src/app/services/globals/globals.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FormRoutes),
        DataViewModule,ProgressBarModule,
        RatingModule,
        ConfirmDialogModule,
        ToolbarModule,
        SliderModule,
        ContextMenuModule,
        CheckboxModule,
        ToastModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        TabViewModule,
        DropdownModule,
        FormsModule,
        RadioButtonModule,
        InputTextareaModule,
        CalendarModule,
        AccordionModule,
        ListboxModule,
        MultiSelectModule,
        TableModule,
        FileUploadModule,
        StepsModule,
        DialogModule,
        AutoCompleteModule,
        ReactiveFormsModule,
        MessagesModule,
        MessageModule
    ],
    declarations: [FormsComponent, DatosCursoComponent, 
        DisenoCurricularComponent,ObservacionesComponent, EstrategiasComponent, EntornoAprendizajeComponent
    ],
    providers: [MessageService, GlobalsService],
})
export class FormModule {
}
