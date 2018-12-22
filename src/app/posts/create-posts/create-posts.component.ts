import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostMessage } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

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
  imagePreview: string | ArrayBuffer;
  isFileUploaded = false;

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
      }),
      'imageControl': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType] // since it is image uploading which is async operation, so angular provides asyncValidator
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
                imagePath: postData['data'].imagePath
              };


              // !updating the form fields with required value (in Edit mode)
              this.formGroup.setValue({ // will set values of all the formfileds/formcontrol
                'titleControl': this.postObjEdited.title,
                'contentControl': this.postObjEdited.content,
                'imageControl': this.postObjEdited.imagePath
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
      content: this.formGroup.value.contentControl,
      imagePath: null
    };

    // !Loading progress spinner
    this.isProgressLoading = true;

    if (this.mode === 'edit') { // !edit mode
      console.log('executing edit post-message');
      post.id = this.idToUpdate;
      this._postsService.editPostMessage(this.idToUpdate, post, this.formGroup.value.imageControl);
    } else { // !add mode
      //  this.postCreated.emit(post);
      console.log('executing add post-message');
      post.id = '';

      // !Communicating two component using inMemeoryService technqiue rather than @Input, @Output
      this._postsService.addPosts(post, this.formGroup.value.imageControl);
    }


    this.formGroup.reset(); // clear the form filed value

  }

  onImagePicked(event: Event) {
    // const fileUploaded = (<HTMLInputElement>event.target).files; // data-type convertion of event.target from any to (HTMLInputElement)
    // !ALternate-way of above code
    const fileUploaded = (event.target as HTMLInputElement).files[0]; // taking first file
    this.formGroup.patchValue({ // will only set particular values of the formfileds/formcontrol
      'imageControl': fileUploaded
    });
    this.formGroup.get('imageControl').updateValueAndValidity(); // !will inform angular that I have changed the value of particular
    //  !formConrtol or formfiled, then angular should re-evalute that particular formFiled
    console.log(this.formGroup);
    const fileReader = new FileReader();
    fileReader.onload = () => { // when loading of file is done, execute below code
      this.imagePreview = fileReader.result; // async code
      this.isFileUploaded = true;
    };
    // load the file
    fileReader.readAsDataURL(fileUploaded);

  }

}
