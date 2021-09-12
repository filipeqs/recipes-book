import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiKey = 'AIzaSyAgPjWpVR0krNgyNOzp_iSDK7xEhCrUCXQ';

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
            {
                email,
                password,
                returnSecureToken: true,
            },
        );
    }
}
