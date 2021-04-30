import {Routes} from '@angular/router';
import { CoursesComponent } from './instructor/courses/courses.component';
import {InstructorComponent} from './instructor/instructor.component';
import { ParticipantsComponent } from './instructor/participants/participants.component';

export const CecyRoutes: Routes = [
    
    {
        path: '',
        children: [
            {
                path: 'courses',
                component: CoursesComponent
            },
            {
                path: 'instructor',
                component: InstructorComponent
            },
            {
                path: 'participants',
                component: ParticipantsComponent
            },
            {
                path: 'forms',
                loadChildren: () => import('./instructor/forms/form.module').then(m => m.FormModule)
            },] 
    }
 
];