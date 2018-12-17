import { Component } from '@angular/core';
import { PostMessage } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  storedPosts: PostMessage[] = [];

  onPostAdded(post: PostMessage) { // adding/pushing the post recived from <app-create-posts> child component to postsList
    console.log(post);
    this.storedPosts.push(post);
  }

}
