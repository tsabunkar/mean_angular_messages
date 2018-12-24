import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const childRoutes: Routes = [
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)], // !Registring the child routes,which is children routes of parent(root) routes
  exports: [RouterModule],
  declarations: [],
})
export class AuthenticationRoutingModule { }

