import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostMessage } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  // @Input() posts: PostMessage[] = []; // post data transfered from parent comp to child component

  posts: PostMessage[] = [];
  private subsciption: Subscription;

  constructor(public _postsService: PostService) { }

  ngOnInit() {
    this.posts = this._postsService.getPosts();
    // here we r listing to event emittied bcoz- inMemeory service -> getPosts() we r copying immutable posts array soo
    // if it was mutable posts array then no need to subjects and this below subscription
    this.subsciption = this._postsService.getPostUpdatedEventListener()
      .subscribe(
        (postsMessages: PostMessage[]) => {
          this.posts = postsMessages;
        }
      );
  }

  ngOnDestroy() {
    // avoid memory leaks
    this.subsciption.unsubscribe();
  }


}
