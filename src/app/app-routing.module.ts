import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreatePostsComponent } from './posts/create-posts/create-posts.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationModule } from './auth/auth.module';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: CreatePostsComponent, canActivate: [AuthGuard] }, // protecting create postMessage route
  { path: 'edit/:idToEdit', component: CreatePostsComponent, canActivate: [AuthGuard] }, // protecting edit postMessage route
  { path: 'user', loadChildren: './auth/auth.module#AuthenticationModule' } // !lazyloading AuthModule
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] // !Registeting the Auth-Gaurd
})
export class AppRoutingModule { }
