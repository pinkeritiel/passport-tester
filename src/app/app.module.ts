import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from  '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { RouterModule, Routes } from '@angular/router';
//import { UserService } from './user.service';
import { NotfoundcomponentComponent } from './notfoundcomponent/notfoundcomponent.component';
//import { NewmemberComponent } from './newmember/newmember.component';

import { routing }        from './app.routing';
import { AlertComponent } from './directives/index';
import { AuthGuard } from './guards/index';
import { AlertService, AuthenticationService, DataService } from './services/index';
import { HomeComponent } from './home/index';
import { LoginFormComponent } from './loginform/loginform.component';
import { RegisterComponent } from './register/index';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AlertComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    NotfoundcomponentComponent
    //,
    //NewmemberComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule

  ],
  providers: [AlertService, AuthenticationService, DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
