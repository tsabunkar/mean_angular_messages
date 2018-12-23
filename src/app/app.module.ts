import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CreatePostsComponent } from './posts/create-posts/create-posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import {
  MatInputModule, MatCardModule, MatButtonModule,
  MatToolbarModule, MatExpansionModule, MatIconModule, MatProgressSpinnerModule, MatPaginatorModule
} from '@angular/material';
import { CreatePostsTemplateDrivenComponent } from './posts/create-posts/create-posts-template.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthInterceptor } from './auth/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    CreatePostsComponent,
    HeaderComponent,
    PostListComponent,
    CreatePostsTemplateDrivenComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Template drive forms
    ReactiveFormsModule, // Reactive forms
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    // material module
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
