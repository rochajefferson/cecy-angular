import { Component } from '@angular/core';
import * as moment from 'moment';
import { User } from './models/auth/user';
import { Role } from './models/auth/role';
import { Institution } from './models/ignug/institution';
import { Token } from './models/auth/token';
moment.locale('es');
@Component({
    selector: 'app-root',
    template: `
    <ngx-spinner bdColor="rgba(0, 0, 0, 0.8)" size="large" color="#eb8b1c" fullScreen="false"
    template="<img src='assets/layout/images/spinner.png'/>">
        <p style="color: white"> Loading...</p>
    </ngx-spinner>
    <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    user: User;
    role: Role;
    institution: Institution;
    token: Token;
    constructor() {
        this.user = {
            id: 1,
            first_name: 'Yogledys',
            second_name: 'Josefina',
            first_lastname: 'Herrera',
            second_lastname: 'Herrera'
        }
       /*  this.role = {
            id: 3,
            name: "TEACHER"
        } */
        this.role = {
            id: 12,
            name: "CECY_COORDINATOR"
        }
        this.institution = {
            acronym: "Y",
            denomination: "INSTITUTO SUPERIOR TECNOLOGICO",
            id: 2,
            logo: "institutions/2.png",
            name: "DE TURISMO Y PATRIMONIO YAVIRAC"
        }
        this.token = {
            access_token: 'hola',
            token_type: 'Bearer'
        }
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('role', JSON.stringify(this.role));
        localStorage.setItem('institution', JSON.stringify(this.institution));
        localStorage.setItem('token', JSON.stringify(this.token));
    }
}