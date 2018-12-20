import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreatePostsComponent } from './posts/create-posts/create-posts.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: CreatePostsComponent },
  { path: 'edit/:idToEdit', component: CreatePostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
