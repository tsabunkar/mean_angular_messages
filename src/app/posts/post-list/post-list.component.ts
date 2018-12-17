import { Component, OnInit, Input } from '@angular/core';
import { PostMessage } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() posts: PostMessage[] = []; // post data transfered from parent comp to child component


  constructor() { }

  ngOnInit() {
  }

}
