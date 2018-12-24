import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { CreatePostsTemplateDrivenComponent } from './posts/create-posts/create-posts-template.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './shared/error/error.component';

import { PostMessageModule } from './posts/post.module';
import { AngularMaterialModule } from './shared/angular-material.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreatePostsTemplateDrivenComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Template drive forms
    // ReactiveFormsModule, // Reactive forms
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    // material module
    AngularMaterialModule,
    // feature module
    PostMessageModule,
    // AuthenticationModule // !bcoz- THIS FEATURE MODULE IS LAZILY LOADED, check app-routing.module.ts
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ // ?entryComponents-> have list of components which r generated/created dynamically
    ErrorComponent
  ]
})
export class AppModule { }
