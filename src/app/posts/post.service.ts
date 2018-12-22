import { Injectable } from '@angular/core';
import { PostMessage } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Regestring the service in the root level (i.e- AppModule). rather than providing in providers array
// in app.module.ts as we used to do old techn
@Injectable({ providedIn: 'root' })
export class PostService {
  // !Creating In-Memery service to interact b/w creat-posts and post-list component
  private posts: PostMessage[] = [];
  private postUpdatedEvent = new Subject<PostMessage[]>();

  constructor(private _http: HttpClient,
    private _router: Router // used for navigation to other component
  ) { }

  // !GETALL
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
                imagePath: posts.imagePath
              };

            });
        })
      )
      .subscribe(transformedPost => {
        this.posts = transformedPost;
        this.postUpdatedEvent.next([...this.posts]);
      });
  }

  // !POST
  addPosts(postMess: PostMessage, image: File) {

    const postData = new FormData();
    postData.append('title', postMess.title);
    postData.append('content', postMess.content);
    postData.append('imageProp', image, postMess.title);

    this._http.post<{ message: string; posts: PostMessage; status: number, postIdCreatedByMongo: string, postObject: PostMessage }>(
      'http://localhost:3000/api/posts', postData
    ).subscribe((respData) => {
      console.log(respData.message);


      /* const postMessObj: PostMessage = {
        id: respData.postIdCreatedByMongo,  // updating the id which is fetched from mongodb created id -> (_id)
        title: postMess.title,
        content: postMess.content
      }; */

      // !Alternative of above code
      const postMessObj: PostMessage = {
        ...postMess,
        id: respData.postIdCreatedByMongo, // updating the id which is fetched from mongodb created id -> (_id)
      };

      // const postIdCreatedByMongodb = respData.postIdCreatedByMongo;
      // post.id = postIdCreatedByMongodb; // updating the id which is fetched from mongodb created id -> (_id)

      this.posts.push(postMessObj);
      this.postUpdatedEvent.next([...this.posts]); // emitting a event (which carries the copied posts array value)

      // after adding of post is done then navigate
      this._router.navigate(['/']);
    });


  }

  getPostUpdatedEventListener() {
    // this method is to pass postUpdatedEvent which can used to listen this event
    return this.postUpdatedEvent.asObservable();
    // asObservable() -> this method makes postUpdatedEvent (i.e Subject event ) as -> Observable<> type
  }

  // !DELETE
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


  getParticularPostFromId(idToFetchPost: string) {
    /*    return {
         ...this.posts.find(post => post.id === idToFetchPost)
       }; // return clone object */
    // !instead of getting local posts array, we r fetching it from backend
    return this._http.get<{ _id: string, title: string, content: string, imagePath: string }>
      (`http://localhost:3000/api/posts/${idToFetchPost}`);
  }

  // !UPDATE
  editPostMessage(id: string, post: PostMessage, image: File | string) {

    let postData: PostMessage | FormData;
    if (typeof (image) === 'object') { // image is file, then send formData
      postData = new FormData();
      postData.append('id', post.id);
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('imageProp', image, post.title);
    } else { // image is string, then send json data
      postData = {
        ...post,
        imagePath: image
      };
    }


    // const postMessageObject: PostMessage = { id, title, content };
    this._http.put(`http://localhost:3000/api/posts/${id}`, postData)
      .subscribe((response) => {
        console.log(response);
        // !posts array is cloned to new variable
        const postsCloned = [...this.posts];
        // !find Index of particular post which got updated
        const oldPostIndex = postsCloned.findIndex(postMess => postMess.id === id); // find calls predicate once
        // for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found,
        // findIndex immediately returns that element index. Otherwise, findIndex returns -1.

        const postMessage: PostMessage = {
          ...post,
          imagePath: ''
        };

        // !update the post which is edited to the clonePosts array
        postsCloned[oldPostIndex] = postMessage;

        // !cloned posts array value is assigned to posts array
        this.posts = postsCloned;
        // !emitting event
        this.postUpdatedEvent.next([...this.posts]);

        // after adding of post is done then navigate
        this._router.navigate(['/']);
      });
  }
}
