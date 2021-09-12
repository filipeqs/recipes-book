import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    apiKey = 'AIzaSyAgPjWpVR0krNgyNOzp_iSDK7xEhCrUCXQ';

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
                {
                    email,
                    password,
                    returnSecureToken: true,
                },
            )
            .pipe(
                catchError(this.handleError),
                tap((resData) => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        +resData.expiresIn,
                        resData.idToken,
                    );
                }),
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
                {
                    email,
                    password,
                    returnSecureToken: true,
                },
            )
            .pipe(
                catchError(this.handleError),
                tap((resData) => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        +resData.expiresIn,
                        resData.idToken,
                    );
                }),
            );
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) return;

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate),
        );

        if (loadedUser.token) {
            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            this.user.next(loadedUser);
        }
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        this.router.navigate(['/auth']);
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, expiresIn: number, token: string) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);

        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(expiresIn * 1000);

        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error ocurred!';

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage =
                    'There is no user record corresponding to this identifier. The user may have been deleted';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password';
                break;
        }
        return throwError(errorMessage);
    }
}
