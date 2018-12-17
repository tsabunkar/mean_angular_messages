import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
  newPost = 'No content';
  enteredValue = '';

  constructor() { }

  ngOnInit() { }

  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
