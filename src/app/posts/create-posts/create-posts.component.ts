import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostMessage } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';


@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  // @Output() postCreated = new EventEmitter<PostMessage>(); // emitting from child comp to parent comp

  constructor(public _postsService: PostService) { }

  ngOnInit() { }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: PostMessage = {
      title: form.value.titleName,
      content: form.value.contentName
    };
    //  this.postCreated.emit(post);
    // !Communicating two component using inMemeoryService technqiue rather than @Input, @Output
    this._postsService.setPosts(post);
    form.resetForm(); // clear the form filed value

  }


}
