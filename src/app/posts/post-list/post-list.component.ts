import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostMessage } from '../post.model';
import { PostService } from '../post.service';
import { Subscription, Observable } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  // @Input() posts: PostMessage[] = []; // post data transfered from parent comp to child component

  posts: PostMessage[] = [];
  private subsciption: Subscription;
  isProgressLoading = false;
  totalRecords = 0; // total number of item/records in db
  itemsPerPage = 2; // how many items we want to show on a given page
  pageSizeOptions = [1, 2, 5, 10];
  currentPage = 1; // user is in first page when this component in initiated
  isUserAuthenticated: Observable<boolean>;
  userId: string;

  constructor(private _postsService: PostService,
    private _authService: AuthService
  ) { }

  ngOnInit() {

    // !Loading progress spinner
    this.isProgressLoading = true;

    this._postsService.getPosts(this.itemsPerPage, this.currentPage); // triggering the event
    // here we r listing to event emittied bcoz- inMemeory service -> getPosts() we r copying immutable posts array soo
    // if it was mutable posts array then no need to subjects and this below subscription
    this.subsciption = this._postsService.getPostUpdatedEventListener()
      .subscribe(
        (postsData: { posts: PostMessage[], totalRecordCount: number }) => {

          // !Remove progress spinner
          this.isProgressLoading = false;
          this.posts = postsData.posts;
          this.totalRecords = postsData.totalRecordCount;
        }
      );

    // !check weather end user has token in its header (i.e - weather user has loggedin/signedin)
    this.isUserAuthenticated = this._authService.getAuthStatusListener();

    // !Fetching the userObjectId
    this.userId = this._authService.getUserId();
  }

  onDelete(postId: string) {
    console.log(postId);
    // !loading progress spinner
    this.isProgressLoading = true;
    this._postsService.deletePost(postId)
      .subscribe(() => {
        this._postsService.getPosts(this.itemsPerPage, this.currentPage);
      });
  }

  onChangedPage(pageData: PageEvent) { // PageEvent -> Object holding-data about the current page
    // !Loading progress spinner
    this.isProgressLoading = true;
    this.currentPage = pageData.pageIndex + 1; // pageIndex -> start with 0, so +1
    this.itemsPerPage = pageData.pageSize;
    this._postsService.getPosts(this.itemsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    // avoid memory leaks
    this.subsciption.unsubscribe();
  }


}
