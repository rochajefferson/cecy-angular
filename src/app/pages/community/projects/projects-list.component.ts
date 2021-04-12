import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../../services/community/community.service'
import { Project } from '../../../models/community/models.index';
import { User } from '../../../models/auth/user';
import { Role } from '../../../models/auth/role';
// PDF
//import jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
})
export class ProjectsComponent implements OnInit {

    projects: Project[];
    user: User;
    role: Role;
    permission: Role;

    // PDF 
    VIDEOGAMES = [
        {
            id: 1,
            name: "Animal Crossing",
            platform: "Nintendo Switch",
            reference: "1-770-736-8031"
        },
        {
            id: 2,
            name: "The Legend of Zelda: Ocarina of Time CV",
            platform: "Wii U",
            reference: "1-770-736-2323"
        },
        {
            id: 3,
            name: "Metal Gear Solid",
            platform: "Playstation (PSX)",
            reference: "1-4564-736-334"
        },
        {
            id: 4,
            name: "ShenMue",
            platform: "Sega Dreamcast",
            reference: "3-770-736-4532"
        },
        {
            id: 5,
            name: "Rise of the Tomb Raider",
            platform: "Playstation 4",
            reference: "1-324-736-3245"
        },
        {
            id: 6,
            name: "Resident Evil 2",
            platform: "Playstation",
            reference: "1-123-3336-4321"
        }
    ];

    constructor(private communityService: CommunityService) {
        // this.user = JSON.parse(localStorage.getItem('user')) as User;
        // this.role = JSON.parse(localStorage.getItem('role')) as Role;
        this.role = {};
    }

    // PDF 
    /* downloadPDF() {
        // Extraemos el
        const DATA = document.getElementById('htmlData');
        const doc = new jsPDF('p', 'pt', 'a4');
        const options = {
            background: 'white',
            scale: 3
        };
        html2canvas(DATA, options).then((canvas) => {
            const img = canvas.toDataURL('image/PNG');
            // Add image Canvas to PDF
            const bufferX = 15;
            const bufferY = 15;
            const imgProps = (doc as any).getImageProperties(img);
            const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
            return doc;
        }).then((docResult) => {
            docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
        });
    }

    public openPDF(): void {
        const DATA = document.getElementById('htmlData');
        let doc = new jsPDF('p', 'pt', 'a4');
        doc.fromHTML(DATA.innerHTML, 15, 15);
        doc.output('dataurlnewwindow');
    } */

    ngOnInit() {
        const params = '?user_id=' + 1 + '&role_id=' + 1;
        this.communityService.get('projects' + params).subscribe(
            response => {
                console.log(response);
                this.projects = [];
                response['data'].forEach(project => {
                    /*
                    this.projects.push({

                    }); */
                });
            },
            error => {
                console.log(error);
            });

    }

}
