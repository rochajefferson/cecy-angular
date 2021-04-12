import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { CommunityService } from '../../../../services/community/community.service';
import { Catalogue } from '../../../../models/ignug/catalogue';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-proyecto',
    templateUrl: './project-info.component.html',
})
export class ProjectInfoComponent implements OnInit {

    // VARIABLES FORM CONTROL
    form: FormGroup;

    // AUTOCOMPLETE COMBO
    assignedLines: SelectItem[];
    filtered: any[]

    // URLS
    urlcombo = 'combo';

    constructor(private communityService: CommunityService,
        private formBuilder: FormBuilder) {
        this.buildForm();
    }

    ngOnInit(): void {
    }

    private buildForm() {
        this.form = this.formBuilder.group({
            title: [''],
            code: [''],
            assigned_line: [''],
            field: [''],
        });
    }

    filterAssignedLines(event) {
        this.communityService.get(this.urlcombo).subscribe(
            response => {
                this.filtered = [];
                const query = event.query;
                response['assignedLine'].forEach(item => {
                    if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                        this.filtered.push(item);
                    }
                });
                this.assignedLines = this.filtered;
            },
            error => {
                console.log(error);
            });
    }
}
