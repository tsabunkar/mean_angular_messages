import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './auth-routing,module';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    FormsModule, // Tempalte-driven forms
    AngularMaterialModule,
    CommonModule, // common functioanlity like - ngIf,ngFor
    AuthenticationRoutingModule
    // !Feature Routng[AuthenticationRoutingModule] Module(i.e-auth-routing.module.ts)
    // !is imported in auth.module.ts and this AuthenticationModule has been imported in AppModule
    // !NOTE: No need to import AuthenticationRoutingModule in AppModule directly
  ],
  exports: [],
  providers: [],
})
export class AuthenticationModule { }
