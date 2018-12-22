import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']

})

export class SigninComponent implements OnInit {

  isProgressLoading = false;

  constructor() { }

  ngOnInit() { }

  onSignIn(form: NgForm) {
    console.log(form);
  }
}
