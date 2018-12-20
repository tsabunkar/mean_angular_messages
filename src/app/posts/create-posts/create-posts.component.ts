import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostMessage } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  // @Output() postCreated = new EventEmitter<PostMessage>(); // emitting from child comp to parent comp
  private isEditMode = 'create';
  private idToUpdate: string;
  postObjEdited: PostMessage;

  constructor(public _postsService: PostService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // if we have idToEdit paramter in the url then -> it is edit, else no such url paramter then it is create
    this.activatedRoute.paramMap.subscribe(
      // paramMap() is an -> observable bcoz the url in the browser can dynamically change
      (paramMap: ParamMap) => {
        if (paramMap.has('idToEdit')) {
          this.isEditMode = 'edit';
          this.idToUpdate = paramMap.get('idToEdit');
          this.postObjEdited = this._postsService.getParticularPostFromId(this.idToUpdate);
        } else {
          this.isEditMode = 'create';
          this.idToUpdate = null;
        }
      }
    );

  }

  onAddEditPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: PostMessage = {
      title: form.value.titleName,
      content: form.value.contentName
    };

    if (this.isEditMode === 'create') { // edit mode
      post.id = this.idToUpdate;
      this._postsService.editPostMessage(this.idToUpdate, post);
    } else { // add mode
      //  this.postCreated.emit(post);
      // !Communicating two component using inMemeoryService technqiue rather than @Input, @Output
      this._postsService.addPosts(post);
    }


    form.resetForm(); // clear the form filed value

  }


}
