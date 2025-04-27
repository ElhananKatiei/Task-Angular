import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard, redirectLoginIfNotAuth } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        canActivate: [ authGuard ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [ redirectLoginIfNotAuth ],
    }
];
