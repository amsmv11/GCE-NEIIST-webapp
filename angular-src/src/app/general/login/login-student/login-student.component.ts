import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-login-student',
    templateUrl: './login-student.component.html',
    styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute, private authService: AuthService,
                private router: Router, private flashMessage: FlashMessagesService) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            const token = params['code'];
            this.authService.registerStudent(token).subscribe( response => {
                if (response.succeeded){
                    this.authService.storeData(response.response_data.user, response.response_data.token);
                    this.router.navigate(['/thesis']);
                } else {
                    this.flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 5000});
                }
            });
        });
    }

}
