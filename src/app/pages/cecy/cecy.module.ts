import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CecyRoutes} from './cecy.routing';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';

import {ToastModule} from 'primeng/toast';
import {SliderModule} from 'primeng/slider';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


//SERVICIOS
import { CecyService } from '../../services/cecy/cecy.service'

import { from } from 'rxjs';
import { InstructorComponent } from './instructor/instructor.component';
import { CoursesComponent } from './instructor/courses/courses.component';
import { GlobalsService } from 'src/app/services/globals/globals.service';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ParticipantsComponent } from './instructor/participants/participants.component';
import { CardModule } from 'primeng/card';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CecyRoutes),
        DataViewModule,
        ToastModule,
        ContextMenuModule,
        ProgressBarModule,
        ToolbarModule,
        RatingModule,
        ConfirmDialogModule,
        SliderModule,
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
        ReactiveFormsModule,
        DialogModule,
        AutoCompleteModule,
        MessagesModule,
        MessageModule,
        CardModule
    ],
    declarations: [InstructorComponent, CoursesComponent, ParticipantsComponent],
    providers: [
       CecyService,
       GlobalsService,MessageService
    ],
})
export class CecyModule {
}
