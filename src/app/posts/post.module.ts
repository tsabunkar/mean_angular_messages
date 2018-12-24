import { NgModule } from '@angular/core';
import { CreatePostsComponent } from './create-posts/create-posts.component';
import { PostListComponent } from './post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CreatePostsComponent,
    PostListComponent,
  ],
  imports: [
    ReactiveFormsModule, // Reactive forms
    AngularMaterialModule,
    CommonModule, // common functioanlity like - ngIf,ngFor
    RouterModule // sharing the routermodule, since we have not create separated post-routing.module.ts file
  ],
  exports: [],

  providers: [],
})
export class PostMessageModule { }
