import { Component, OnInit } from '@angular/core';
import { PostMessage } from './posts/post.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /* storedPosts: PostMessage[] = [];

  onPostAdded(post: PostMessage) { // adding/pushing the post recived from <app-create-posts> child component to postsList
    console.log(post);
    this.storedPosts.push(post);
  }
 */
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    // !Call this method here bcoz, this is root Component
    this._authService.autoAuthenticateUserWhenPageReload();
  }
}
