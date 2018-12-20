import { Injectable } from '@angular/core';
import { PostMessage } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// Regestring the service in the root level (i.e- AppModule). rather than providing in providers array
// in app.module.ts as we used to do old techn
@Injectable({ providedIn: 'root' })
export class PostService {
  // !Creating In-Memery service to interact b/w creat-posts and post-list component
  private posts: PostMessage[] = [];
  private postUpdatedEvent = new Subject<PostMessage[]>();

  constructor(private _http: HttpClient) { }

  getPosts() {
    // return this.posts; // if we do like this, we are copying the reference type of posts varuable
    // so we should pass the copy of this posts variable - can be done using spread opeartor
    // return [...this.posts]; // passing the immutable posts array
    // !calling the node backend
    this._http
      .get<{ message: string; posts: any; status: number }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(
        map((postData) => {  // map() -> rxjs map operator
          return postData.posts
            .map(posts => {// map() is js function

              return {
                title: posts.title,
                id: posts._id, // mapping _id (of db) --to--> id property in frontend
                content: posts.content,
              };

            });
        })
      )
      .subscribe(transformedPost => {
        this.posts = transformedPost;
        this.postUpdatedEvent.next([...this.posts]);
      });
  }

  setPosts(post: PostMessage) {
    this._http.post<{ message: string; posts: PostMessage; status: number, postIdCreatedByMongo: string }>(
      'http://localhost:3000/api/posts', post
    ).subscribe((respData) => {
      console.log(respData.message);
      const postIdCreatedByMongodb = respData.postIdCreatedByMongo;
      post.id = postIdCreatedByMongodb; // updating the id which is fetched from mongodb created id -> (_id)
      this.posts.push(post);
      this.postUpdatedEvent.next([...this.posts]); // emitting a event (which carries the copied posts array value)

    });


  }

  getPostUpdatedEventListener() {
    // this method is to pass postUpdatedEvent which can used to listen this event
    return this.postUpdatedEvent.asObservable();
    // asObservable() -> this method makes postUpdatedEvent (i.e Subject event ) as -> Observable<> type
  }

  deletePost(postId: string) {
    console.log(postId);
    this._http.delete(
      `http://localhost:3000/api/posts/${postId}`
    )
      .subscribe(() => {
        console.log('Deleted');
        // filter() -> allows us to return subset of the original array
        const updatedPostsFiltered = this.posts.filter(
          post => post.id !== postId
        );
        this.posts = updatedPostsFiltered;
        this.postUpdatedEvent.next([...this.posts]); // Emitting an event to update all other posts
      });
  }
}
