import { Injectable } from '@angular/core';
import { PostMessage } from './post.model';

// Regestring the service in the root level (i.e- AppModule). rather than providing in providers array
// in app.module.ts as we used to do old techn
@Injectable({ providedIn: 'root' })
export class PostService {
  // !Creating In-Memery service to interact b/w creat-posts and post-list component
  private posts: PostMessage[] = [];

  constructor() { }

  getPosts() {
    // return this.posts; // if we do like this, we are copying the reference type of posts varuable
    // so we should pass the copy of this posts variable - can be done using spread opeartor
    return [...this.posts]; // passing the immutable posts array
  }

  setPosts(post: PostMessage) {
    this.posts.push(post);
  }
}
