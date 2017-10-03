import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginFormComponent } from './loginform/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);