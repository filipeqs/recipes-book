import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
    isLogginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    onSwitchMode() {
        this.isLogginMode = !this.isLogginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) return;

        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLogginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
            (response) => {
                console.log(response);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            (errorMessage) => {
                this.error = errorMessage;
                this.isLoading = false;
            },
        );

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }
}
