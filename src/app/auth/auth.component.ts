import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
    isLogginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    onSwitchMode() {
        this.isLogginMode = !this.isLogginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) return;

        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        if (this.isLogginMode) {
        } else {
            this.authService.signup(email, password).subscribe(
                (response) => {
                    console.log(response);
                    this.isLoading = false;
                },
                (error) => {
                    this.error = 'An error ocurred!';
                    this.isLoading = false;
                },
            );
        }

        form.reset();
    }
}
