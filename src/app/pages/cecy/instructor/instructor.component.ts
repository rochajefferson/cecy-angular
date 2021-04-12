import { Component, OnInit } from '@angular/core';
import { Role, User } from 'src/app/models/auth/models.index';
import { CecyService } from 'src/app/services/cecy/cecy.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html'
})
export class InstructorComponent implements OnInit {

  user: User;
  role: Role;

  constructor(private cecyService: CecyService) { }

  ngOnInit(): void {
    this.getLocalStorage();
  }

  public getLocalStorage() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.role = JSON.parse(localStorage.getItem('role')) as Role;
    console.log('usuario', this.role);
  }

  

}
