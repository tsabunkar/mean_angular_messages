import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostMessage } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  private mode = 'create';
  private idToUpdate: string;
  postObjEdited: PostMessage;
  isProgressLoading = false;
  formGroup: FormGroup;

  constructor(public _postsService: PostService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.formGroup = new FormGroup({
      'titleControl': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'contentControl': new FormControl(null, {
        validators: [Validators.required]
      })
    });



    // if we have idToEdit paramter in the url then -> it is edit, else no such url paramter then it is create
    this.activatedRoute.paramMap.subscribe(
      // paramMap() is an -> observable bcoz the url in the browser can dynamically change
      (paramMap: ParamMap) => {
        if (paramMap.has('idToEdit')) {
          console.log('edit mode');
          this.mode = 'edit';
          this.idToUpdate = paramMap.get('idToEdit');
          // !Loading progress spinner
          this.isProgressLoading = true;

          // this.postObjEdited = this._postsService.getParticularPostFromId(this.idToUpdate);
          this._postsService.getParticularPostFromId(this.idToUpdate)
            .subscribe(postData => {

              // !Removing progress spinner, after fetching data from backend
              this.isProgressLoading = false;

              this.postObjEdited = {
                id: postData['data']._id,
                title: postData['data'].title,
                content: postData['data'].content,
              };


              // !updating the form fields with required value (in Edit mode)
              this.formGroup.setValue({
                'titleControl': this.postObjEdited.title,
                'contentControl': this.postObjEdited.content,
              });

            });
        } else {
          console.log('create mode');
          this.mode = 'create';
          this.idToUpdate = null;
        }
      }
    );

  }

  onAddEditPost() {
    if (this.formGroup.invalid) {
      return;
    }
    const post: PostMessage = {
      title: this.formGroup.value.titleControl,
      content: this.formGroup.value.contentControl
    };

    // !Loading progress spinner
    this.isProgressLoading = true;

    if (this.mode === 'edit') { // edit mode
      console.log('executing edit post-message');
      post.id = this.idToUpdate;
      this._postsService.editPostMessage(this.idToUpdate, post);
    } else { // add mode
      //  this.postCreated.emit(post);
      console.log('executing add post-message');
      post.id = '';
      // !Communicating two component using inMemeoryService technqiue rather than @Input, @Output
      this._postsService.addPosts(post);
    }


    this.formGroup.reset(); // clear the form filed value

  }


}
